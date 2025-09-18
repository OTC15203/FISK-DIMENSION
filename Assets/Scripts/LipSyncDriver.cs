// Filename: LipSyncDriver.cs
using UnityEngine;

public class LipSyncDriver : MonoBehaviour
{
    // Example: Assign a SkinnedMeshRenderer of your character's face
    public SkinnedMeshRenderer characterFace; 
    private bool isTalking = false;
    private float timer = 0f;

    void Update()
    {
        // Simple open-close animation when talking
        if (isTalking)
        {
            timer += Time.deltaTime * 10; // Speed of mouth movement
            float weight = (Mathf.Sin(timer) + 1) / 2 * 100; // Value from 0-100
            // Assuming blend shape index 0 is for mouth open/close
            if(characterFace != null)
                characterFace.SetBlendShapeWeight(0, weight);
        }
    }

    // Called by PlayerController when dialogue starts
    public void StartLipSync()
    {
        isTalking = true;
    }

    // Called by PlayerController when dialogue ends
    public void StopLipSync()
    {
        isTalking = false;
        timer = 0;
        // Reset mouth to closed position
        if(characterFace != null)
            characterFace.SetBlendShapeWeight(0, 0);
    }

    // Placeholder for a more advanced system
    public void ProcessPhonemes(object phonemeData)
    {
        Debug.Log("Phoneme data received (not implemented).");
    }
}
