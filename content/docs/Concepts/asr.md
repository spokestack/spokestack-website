---
title: ASR configuration
navId: ASR
description: Documentation for Spokestack's third-party ASR support
draft: false
---

Spokestack is designed to support multiple speech recognition providers so you can decide which is right for your use case. Support varies by mobile platform, however, so we decided to gather the information in one place to make the choice as easy as possible for your app.

## Supported ASR providers by platform

| Provider                                                                                                | Android  | iOS       |
| ------------------------------------------------------------------------------------------------------- | -------- | --------- |
| Android ASR (on-device)                                                                                 | &#9989;  | &#10060;  |
| Apple ASR (on-device)                                                                                   | &#10060; | &#9989;   |
| Spokestack Cloud ASR                                                                                    | &#9989;  | &#x1F51C; |
| [Azure Speech Services](https://azure.microsoft.com/en-us/services/cognitive-services/speech-services/) | &#9989;  | &#10060;  |
| [Google Cloud](https://cloud.google.com/speech-to-text)                                                 | &#9989;  | &#10060;  |

## Configuration

ASR providers require various configuration, usually in the form of API keys, but sometimes runtime components. This configuration takes place when you first build a Spokestack `SpeechPipeline`; below is a list of configuration needed for each platform and some usage notes.

For Android, primitive configuration properties are set via a call to `setProperty(propertyName, value)` on the speech pipeline's builder (or a `SpeechConfig` object supplied to it); in iOS, they're set as fields of a `SpeechConfiguration` object.

---

#### Android ASR

##### Android

No API keys or configuration properties are required, but a Context (`android.content.Context`) object must be added to the `SpeechPipeline`'s builder via the `setAndroidContext()` method. See [the javadoc for `AndroidSpeechRecognizer`](https://www.javadoc.io/doc/io.spokestack/spokestack-android/latest/io/spokestack/spokestack/android/AndroidSpeechRecognizer.html) for more information.

###### Device compatibility

Android's native ASR support is device-dependent. For production apps targeting broad compatibility, we recommend testing for its availability by calling [`SpeechRecognizer.isRecognitionAvailable()`](<https://developer.android.com/reference/android/speech/SpeechRecognizer#isRecognitionAvailable(android.content.Context)>) and having a fallback option in place for if it returns `false`.

This chart lists physical devices on which it has been tested by either the Spokestack team or our community. If you have a device that is not listed, please try it out and submit a PR with your results!

| Device                 | API Level | ASR working? |
| ---------------------- | --------- | ------------ |
| Moto X (2nd Gen)       | 22        | &#10060;`*`  |
| Lenovo TB-X340F tablet | 27        | &#9989;      |
| Pixel 1                | 29        | &#9989;      |
| Pixel 3 XL             | 29        | &#9989;      |
| Pixel 3a               | 29        | &#9989;      |
| Pixel 4                | 29        | &#9989;      |

`*` ASR fails consistently with a `SERVER_ERROR`, which seems to indicate that the server used by the device manufacturer to handle these requests is no longer operational.

##### iOS

N/A

---

#### Apple ASR

##### Android

N/A

##### iOS

None required! &#x1F389;

---

#### Spokestack Cloud ASR

Spokestack's Cloud ASR requires requests to be signed with a Spokestack client ID and API secret. Spokestack accounts are free, and cloud-based ASR currently is as well. If you don't already have an account, you can sign up for one [here](/create); if you do, [log in](/login) to get your credentials.

##### Android

- `spokestack-id` (string): A Spokestack client ID, available in the account portal.
- `spokestack-secret` (string): A Spokestack API secret, also available in the account portal.

##### iOS

- `spokestack-id` (string): A Spokestack client ID, available in the account portal.
- `spokestack-secret` (string): A Spokestack API secret, also available in the account portal.

---

#### Azure Speech Services

##### Android

- `azure-api-key` (string): An API key valid for Azure Cognitive Services. See [Microsoft's documentation](https://azure.microsoft.com/en-us/try/cognitive-services/?api=speech-services) for more information.
- `azure-region` (string): A region identifier for Azure Speech Services. See [Microsoft's list](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/regions).

##### iOS

N/A (for now)

---

#### Google Cloud

##### Android

- `google-credentials` (string): A JSON-serialized string containing Google account credentials. See [Google's documentation](https://cloud.google.com/docs/authentication/getting-started#creating_a_service_account) for more information.
- `locale` (string): A BCP-47 language identifier to identify the language that should be used for speech recognition (example: "en-US"). See [Google's documentation](https://cloud.google.com/speech-to-text/docs/languages) for a list of supported codes.

##### iOS

N/A (for now)
