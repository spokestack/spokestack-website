---
title: Cookbook
navId: Cookbook (iOS)
description: Code snippets and tips for iOS
draft: false
---

This is a collection of code snippets and brief descriptions designed to help you be as productive as possible as quickly as possible. Check out the Concepts section on the left for more detailed discussions about the techniques mentioned here.

### Tap to talk

```javascript
onTalkButtonPressed () {
  // if the pipeline has been started elsewhere, you
  // don't need this line
  Spokestack.start()

  // skips the wakeword activation and sends the pipeline
  // straight to ASR
  Spokestack.activate()
}
```

### Wakeword Activation

To use the demo "Spokestack" wakeword, you'll need the demo TensorFlow Lite models: [detect](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/detect.lite) | [encode](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/encode.lite) | [filter](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/filter.lite)

```javascript
Spokestack.initialize({
  input: 'io.spokestack.spokestack.android.MicrophoneInput', // provides audio input into the pipeline
  stages: [
    'io.spokestack.spokestack.webrtc.VoiceActivityDetector', // voice activity detection
    'io.spokestack.spokestack.ActivationTimeout', // speech recognition times out after a configurable interval when voice is no longer detected
    'io.spokestack.spokestack.wakeword.WakewordTrigger' // wakeword activtation trigger
  ],
  properties: {
    'sample-rate': 16000,
    'frame-width': 20,
    'ans-policy': 'aggressive',
    // 'agc-target-level-dbfs': 3,
    'agc-compression-gain-db': 15,
    'vad-mode': 'very-aggressive',
    'vad-fall-delay': 800,
    'wake-threshold': 0.9,
    'wake-active-min': 2000,
    'wake-active-max': 5000,
    wakewords: 'spokestack',
    'wake-filter-path': filterModelPath,
    'wake-detect-path': detectModelPath,
    'wake-encode-path': encodeModelPath,
    'wake-phrase-length': 2000,
    'wake-smooth-length': 10,
    'fft-window-size': 512,
    'fft-hop-length': 10,
    'pre-emphasis': 0.97,
    'trace-level': Spokestack.TraceLevel.DEBUG
  }
})

Spokestack.start() // start speech pipeline. can only start after initialize is called. begins listening for the configured wakeword.
```

### Cancel ASR (before the timeout is reached)

```javascript
cancelAsr () {
  Spokestack.deactivate()
}
```

When `deactivate` is called, Spokestack will continue listening for the next wakeword activation. To stop listening entirely, call

```javascript
Spokestack.stop()
```

After calling this, you'll need to call

```javascript
Spokestack.start()
```

before you'll be able to recognize a wakeword again.

If speech is being processed when `deactivate` is called, it may still trigger the `onRecognize` event when processing is complete.

### Extracting an intent slot value from `onClassification`

Let's say you're creating a voice-controlled timer and wish to perform simplistic natural language processing to respond to a handful of commands: `start, stop, reset, start over`. Here's how to extract a slot value from an `onClassification` event. Note that the intent and slot names are pre-determined by the NLU model metadata.

```javascript
onClassification (e) {
  var result = e.result
  var intent = result.intent
  var intentSlots = intent.slots
  switch (intent) {
    case "start":
      // the "start" intent can have slots named "duration" and "units"
      var duration = intentSlots["duration"].value
      var units = intentSlots["units"].value
      // start a timer for `duration` `units` (eg 60 seconds) and change the UI accordingly
      break
    default:
      // handle an unexpected intent
  }
}
```

### Synthesis speech formatted with [SpeechMarkdown](https://www.speechmarkdown.org/)

When creating a synthesis request, the request takes a dictionary with specific keys. The `id` field is for your convenience, and `voice` may be changed by creating a [Spokestack account](https://spokestack.io/account). The `input` is where the SpeechMarkdown-formatted text will be placed.

```javascript
Spokestack.synthesize({
  id: '1234567890',
  input:
    'Yet right now the average age of this (50)[number] second Parliament is (49)[number] years old, [1s] OK.',
  format: Spokestack.TTSFormat.SPEECHMARKDOWN,
  voice: 'demo-male'
})
```