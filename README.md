# FISK DIMENSION – Unity Dialogue Prototype

"Fisk Dimension – A visionary open-source collective on GitHub, where intellect, artistry, and innovation converge. Only the circled will do. 💯"

This repository contains the minimal Unity scaffolding for loading an episode JSON file, playing dialogue audio line-by-line, and presenting branching choices that advance the story. The prototype is intentionally lightweight so it can be dropped into a new Unity project and expanded from there.

## Repository Layout

```
Assets/
├── Resources/
│   ├── Audio/              # Place generated dialogue audio here (e.g. ep001_s0_prologue_l000.wav)
│   └── episode.json        # Sample episode data for testing
└── Scripts/
    ├── ChoiceOverlay.cs    # Handles displaying choices to the player
    ├── EpisodeLoader.cs    # Loads and deserializes the episode JSON
    ├── LipSyncDriver.cs    # Simple placeholder lip-sync controller
    └── PlayerController.cs # Core gameplay loop for dialogue playback
```

## Unity Setup Instructions

1. **Create the Game Controller**  
   Add an empty `GameObject` to your scene and rename it `GameController`.
2. **Attach Scripts**  
   Add `PlayerController.cs` and `LipSyncDriver.cs` to the `GameController` object.
3. **Add Audio Source**  
   Attach an `AudioSource` component to `GameController` and assign it to the `PlayerController`'s **Audio Source** field.
4. **Create UI Canvas**  
   In the Hierarchy choose **UI → Canvas** (Unity will also add an `EventSystem`).
5. **Build the Choice Panel**  
   - Inside the Canvas, create a **Panel** named `ChoicePanel`.  
   - Inside `ChoicePanel`, add a **Text** element named `PromptText`.  
   - Add as many **Button** elements as needed for choices (the sample expects two). Name them `OptionButton1`, `OptionButton2`, etc.
6. **Wire Up `ChoiceOverlay`**  
   - Select `ChoicePanel` and add the `ChoiceOverlay.cs` component.  
   - Assign references in the Inspector: drag `ChoicePanel` into **Choice Panel**, `PromptText` into **Prompt Text**, and your button objects into the **Option Buttons** array.
7. **Reference the Choice Overlay**  
   Return to the `GameController`, drag the `ChoicePanel` object into the `PlayerController`'s **Choice Overlay** field, and drag your lip-sync driver component into **Lip Sync Driver**.
8. **Add Episode Content**  
   - Leave `Assets/Resources/episode.json` in place for testing or replace it with your own episode file (remember the loader automatically remaps `char`→`char_id` and `goto`→`goto_scene`).  
   - Drop your generated audio clips into `Assets/Resources/Audio/` using the naming convention `episodeId_sceneId_l###` (e.g. `ep001_s0_prologue_l000`).
9. **Press Play**  
   Enter Play Mode. The `PlayerController` loads the JSON episode, plays each audio line sequentially, and displays choices when a scene defines them. Choice selection (or timeout) drives scene transitions.

## Next Steps

- Replace placeholder lip-sync logic with your character animation system.  
- Trigger rig animations and FX based on the `anim` and `fx` metadata embedded in each line.  
- Expand the UI to visualize choice timers, player inventory, or relationship meters.

Feel free to adapt and build upon this scaffold as the project evolves.
