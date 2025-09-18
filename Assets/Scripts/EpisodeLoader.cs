// Filename: EpisodeLoader.cs
using UnityEngine;
using System;
using System.Collections.Generic;

// --- Data Structures to match JSON schema ---
[Serializable]
public class EpisodeData
{
    public Episode episode;
}

[Serializable]
public class Episode
{
    public string id;
    public string title;
    public List<Character> characters;
    public List<Scene> scenes;
}

[Serializable]
public class Character
{
    public string id;
    public string display;
    public string voice;
    public string rig;
}

[Serializable]
public class Scene
{
    public string id;
    public List<Line> lines;
    public Choice choice;
}

[Serializable]
public class Line
{
    public string char_id; // Renamed from 'char' as it's a keyword in C#
    public string tts;
    public string anim;
    public string fx;
}

[Serializable]
public class Choice
{
    public int timeout_sec;
    public string prompt_caption;
    public List<ChoiceOption> options;
}

[Serializable]
public class ChoiceOption
{
    public string id;
    public string caption;
    public string goto_scene; // Renamed from 'goto' as it's a keyword in C#
}


// --- Loader Class ---
public static class EpisodeLoader
{
    public static Episode LoadEpisode(string episodeFileName)
    {
        TextAsset jsonFile = Resources.Load<TextAsset>(episodeFileName);
        if (jsonFile == null)
        {
            Debug.LogError($"Failed to load episode file: {episodeFileName}.json. Make sure it's in a Resources folder.");
            return null;
        }

        // Unity's JsonUtility has issues with root objects. A simple trick is to rename our fields
        // to avoid C# keywords and then replace them back before parsing.
        string jsonText = jsonFile.text;
        jsonText = jsonText.Replace("\"char\":", "\"char_id\":");
        jsonText = jsonText.Replace("\"goto\":", "\"goto_scene\":");
        
        EpisodeData episodeData = JsonUtility.FromJson<EpisodeData>(jsonText);
        
        if (episodeData == null || episodeData.episode == null)
        {
            Debug.LogError("Failed to parse episode data from JSON.");
            return null;
        }

        return episodeData.episode;
    }
}
