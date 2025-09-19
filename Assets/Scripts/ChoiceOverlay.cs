// Filename: ChoiceOverlay.cs
using UnityEngine;
using UnityEngine.UI;
using System;
using System.Collections.Generic;

public class ChoiceOverlay : MonoBehaviour
{
    [Header("UI References")]
    public GameObject choicePanel; // The parent panel for all choice UI
    public Text promptText;
    public Button[] optionButtons; // Assign your choice buttons in the inspector

    public event Action<ChoiceOption> OnOptionPicked;
    public event Action OnChoiceTimeout;

    private Choice currentChoice;
    private float timeoutTimer;

    void Start()
    {
        Hide();
    }

    void Update()
    {
        if (choicePanel.activeSelf && currentChoice != null && currentChoice.timeout_sec > 0)
        {
            timeoutTimer -= Time.deltaTime;
            // TODO: Update a visual timer on the UI
            if (timeoutTimer <= 0)
            {
                OnChoiceTimeout?.Invoke();
                Hide();
            }
        }
    }

    public void Show(Choice choice)
    {
        currentChoice = choice;
        promptText.text = choice.prompt_caption;

        for (int i = 0; i < optionButtons.Length; i++)
        {
            if (i < choice.options.Count)
            {
                optionButtons[i].gameObject.SetActive(true);
                // Update the button text
                optionButtons[i].GetComponentInChildren<Text>().text = choice.options[i].caption;
                // Get a local copy of the option for the listener
                ChoiceOption option = choice.options[i];
                // Remove any previous listeners and add a new one
                optionButtons[i].onClick.RemoveAllListeners();
                optionButtons[i].onClick.AddListener(() => PickOption(option));
            }
            else
            {
                optionButtons[i].gameObject.SetActive(false);
            }
        }
        
        timeoutTimer = choice.timeout_sec;
        choicePanel.SetActive(true);
    }

    public void Hide()
    {
        choicePanel.SetActive(false);
    }

    private void PickOption(ChoiceOption option)
    {
        OnOptionPicked?.Invoke(option);
        Hide();
    }
}
