// Filename: PlayerController.cs
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Linq; // Required for Find()

public class PlayerController : MonoBehaviour
{
    public enum GameState { LOADING, PLAYING, PAUSED, CHOICE_WAITING, TRANSITION, ENDED }
    
    [Header("Component References")]
    public AudioSource audioSource;
    public ChoiceOverlay choiceOverlay;
    public LipSyncDriver lipSyncDriver; // Assign your character's lip-sync driver here

    [Header("Episode Data")]
    public string episodeFileName = "episode"; // Name of the JSON file in Resources
    
    private Episode currentEpisode;
    private Scene currentScene;
    private int currentLineIndex;
    private GameState currentState;
    private Dictionary<string, Scene> sceneLookup;

    void Start()
    {
        // Subscribe to events from the choice overlay
        choiceOverlay.OnOptionPicked += HandleChoicePicked;
        choiceOverlay.OnChoiceTimeout += HandleChoiceTimeout;
        
        StartCoroutine(SetupEpisode());
    }

    private IEnumerator SetupEpisode()
    {
        SetState(GameState.LOADING);
        currentEpisode = EpisodeLoader.LoadEpisode(episodeFileName);

        if (currentEpisode != null)
        {
            // Create a fast lookup dictionary for scenes by their ID
            sceneLookup = currentEpisode.scenes.ToDictionary(scene => scene.id, scene => scene);
            
            // Start with the first scene
            currentScene = currentEpisode.scenes[0];
            currentLineIndex = -1; // Start at -1 to advance to 0 first
            yield return new WaitForSeconds(1f); // Artificial load time
            SetState(GameState.PLAYING);
            StartCoroutine(PlayScene());
        }
        else
        {
            SetState(GameState.ENDED);
            Debug.LogError("Episode could not be loaded. Halting playback.");
        }
    }

    private IEnumerator PlayScene()
    {
        // Hide choice UI when a new scene starts
        choiceOverlay.Hide();

        // Advance to the next line
        currentLineIndex++;
        
        // Check if there are more lines in the current scene
        if (currentLineIndex < currentScene.lines.Count)
        {
            Line line = currentScene.lines[currentLineIndex];
            
            // Construct the audio clip ID (matches the SSML generator)
            string audioId = $"{currentEpisode.id}_{currentScene.id}_l{currentLineIndex:000}";
            
            // Load the audio clip from Resources/Audio/
            AudioClip clip = Resources.Load<AudioClip>($"Audio/{audioId}");

            if (clip)
            {
                Debug.Log($"Playing: [{line.char_id}] '{line.tts}'");
                
                // Trigger lip-sync and animations (placeholders)
                lipSyncDriver.StartLipSync(); 
                // TODO: Trigger animations based on line.anim
                // TODO: Trigger FX based on line.fx

                audioSource.PlayOneShot(clip);
                
                // Wait for the audio clip to finish playing
                yield return new WaitForSeconds(clip.length);

                lipSyncDriver.StopLipSync();

                // Recursively call this coroutine to play the next line
                StartCoroutine(PlayScene());
            }
            else
            {
                Debug.LogError($"AudioClip not found: {audioId}. Make sure it's in 'Resources/Audio/'");
                // Skip to the next line after a short delay on error
                yield return new WaitForSeconds(1f);
                StartCoroutine(PlayScene());
            }
        }
        else
        {
            // All lines are finished, check for a choice
            if (currentScene.choice != null && currentScene.choice.options.Count > 0)
            {
                SetState(GameState.CHOICE_WAITING);
                choiceOverlay.Show(currentScene.choice);
            }
            else
            {
                // No more lines and no choice, end the episode
                Debug.Log("End of episode.");
                SetState(GameState.ENDED);
            }
        }
    }

    private void HandleChoicePicked(ChoiceOption option)
    {
        Debug.Log($"Player picked option: {option.caption}, moving to scene: {option.goto_scene}");
        TransitionToScene(option.goto_scene);
    }
    
    private void HandleChoiceTimeout()
    {
        Debug.Log("Choice timed out. Handling default path (first option).");
        // Default behavior: pick the first option
        if (currentScene.choice != null && currentScene.choice.options.Count > 0)
        {
            TransitionToScene(currentScene.choice.options[0].goto_scene);
        }
    }

    private void TransitionToScene(string sceneId)
    {
        SetState(GameState.TRANSITION);
        
        if (sceneLookup.TryGetValue(sceneId, out Scene nextScene))
        {
            currentScene = nextScene;
            currentLineIndex = -1; // Reset line index for the new scene
            SetState(GameState.PLAYING);
            StartCoroutine(PlayScene());
        }
        else if (sceneId == "ep001_end")
        {
             Debug.Log("End of episode reached via goto target.");
             SetState(GameState.ENDED);
        }
        else
        {
            Debug.LogError($"Scene ID not found: {sceneId}. Cannot transition.");
            SetState(GameState.ENDED);
        }
    }

    private void SetState(GameState newState)
    {
        currentState = newState;
        Debug.Log($"Game State changed to: {currentState}");
    }
}
