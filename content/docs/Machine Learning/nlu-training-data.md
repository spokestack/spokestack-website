---
title: NLU Training Data
navId: NLU Training (Machine Learning)
description: Documentation for the NLU training data format.
draft: false
tags: NLU
seoImage: '../../assets/docs/concepts-nlu.png'
---

Spokestack's NLU data is expressed in the [TOML](https://github.com/toml-lang/toml) format. A full model consists of a collection of TOML files, each one expressing a separate intent. These files can be compressed into a single `.zip` file and imported via the [Account](/account/services/nlu) section, which can be convenient if you don't have an existing voice app on another platform and want to start from scratch.

Your zip file's hierarchy should look like this (read on for information on each folder):

```none
yourModel.zip
├--intents/
| ├-intent.one.toml
| |-intent.two.toml
| └- ...
|
└--entities/
  ├-entity1.txt
  ├-entity2.txt
  └- ...
```

Spokestack's NLU models are currently English-centric. Other languages may work, but accuracy will likely be lower than with English data, and special slot types like [`integer`](#integer) and [`digits`](#digits) generate data in English only.

We're currently experimenting with support for multilingual NLU; if this is a feature that would be useful to you, please let us know [on our forum](https://forum.spokestack.io/c/feature-requests/16).

## Intent file format

Intent files are named after the intents they're meant to produce at runtime, so an intent named `request.search` would be described in a file named `request.search.toml`. Note that dots are valid in intent names; the intent filename without the extension will be returned at runtime.

The main content in an intent file is a list of phrases that a user might utter in order to accomplish the action represented by the intent. These phrases, or _utterances_, are used to train a neural text classification/slot recognition model.

Utterances are expressed using templates with placeholder values. These placeholders are expanded into concrete values by a data generator, thus producing many natural-language permutations of each template.

A full example of features supported by intent configuration is below.

_**Note**: All sections except `utterances` are optional. However, for each placeholder in `{braces}` used in your utterances, you must have either a slot or generator with a name that matches the text inside the braces._

```toml
description = """
Search for an exercise video relevant to a specific muscle group.
"""

[implicit_slots.search_target]
type = "entity"
value = "exercise"

[slots.muscle_group]
type = "entity"
values = [
    "neck",
    "back",
    "biceps",
    "triceps",
    "calves"
]

[generators.search_phrase]
type = "list"
values = [
    "search for",
    "find me",
    "i want"
]

[generators.exercise]
type = "list"
values = [
    "exercise",
    "workout",
    "series",
    "circuit",
    "routine",
    "movement"
]

[utterances]
values = [
    "{search_phrase} a {muscle_group} {exercise}",
    "i want to exercise my {muscle_group}"
]
```

The data generator will take the phrases listed in `utterances` and expand their placeholders to produce examples like the following:

```none
i want a neck exercise
find me a calves workout
search for a biceps movement
i want to exercise my triceps
...
```

Let's talk about the individual sections, starting at the top of the example. Note that the order is merely convention; declaration order does not affect the data generator's output.

### Description

A plaintext description may be included in an intent to help the app developer decide what action to take when the intent is received, though it has no effect at runtime; the intent returned at runtime will match the file name, as mentioned above.

#### Implicit slot values

Sometimes a slot's value isn't given directly in the utterance, but is implied but the utterance or intent itself; for example, "record for 30 seconds" in a camera application implies recording a video. This is an important slot value to communicate to the app, though, because a generic command to capture using the camera could refer to a still image or video.

In the example above, the implicit slot value is used as a hint to the domain's search backend, to specify searching for an exercise as opposed to, for example, exercise equipment.

Note that the value for an implicit slot defined by an intent can be overridden if an explicit value for that slot is detected in a user utterance.

_This feature is currently only supported at runtime on the Android platform._

| field   | type   | description               | default      |
| ------- | ------ | ------------------------- | ------------ |
| `type`  | string | the slot's type           | _(required)_ |
| `value` | string | the slot's implicit value | _(required)_ |

#### Slots

Slots represent key portions of an utterance that are important to completing the user's request and thus must be captured explicitly at prediction time. The type of a slot determines both how it is expressed in an intent configuration and how it is interpreted by clients of the NLU model. For more information on each type and additional fields it supports, see its description below.

| field  | type   | description                    | default      |
| ------ | ------ | ------------------------------ | ------------ |
| `type` | string | the slot's [type](#slot-types) | _(required)_ |

#### Generators

Generators are placeholders that exist merely to reduce duplication in utterance templates, e.g., to substitute verb or preposition synonyms in a given template. These values are not captured at prediction time. For more information on each type and additional fields it supports, see its description below.

| field  | type   | description                              | default      |
| ------ | ------ | ---------------------------------------- | ------------ |
| `type` | string | the generator's [type](#generator-types) | _(required)_ |

#### Utterances

The `utterances` map only supports one key — `values` — which is a list containing the utterance templates described at the top of this page. Within each utterance, generator and slot names are both enclosed in braces (`{}`).

## Slot types

### digits

A `digits` slot is similar to an [`integer`](#integer) slot, but not identical. `digits` slots capture numbers that are spoken in a series, such as a birthday or phone number: "one eight zero zero" (or "one eight hundred") instead of "one thousand eight hundred" or "eighteen hundred". Pronunciation conventions for these sorts of numbers create an ambiguity — "one eight hundred thirty-six" could mean 1836 or 180036. Given the common pronunciation of phone numbers, a `digits` slot will generate the latter format, and words like "hundred" will result in trailing zeros when the slot value is parsed by a Spokestack client library. The first format would only be produced by parsing an ASR result that doesn't contain "hundred", for example, "eighteen thirty-six" or "one eight three six".

| field    | type    | description                                                                                  | default      |
| -------- | ------- | -------------------------------------------------------------------------------------------- | ------------ |
| `count`  | integer | the number of consecutive integers to generate, including trailing zeros in numbers like 100 | _(required)_ |
| `canon`  | boolean | only generate canonical number words (no homophones)                                         | false        |
| `digits` | boolean | generate numerical sequences as well as number words                                         | true         |

#### Example

```toml
[slots.phone_number]
type = "digits"
count = 5
```

will result in 5-digit random numbers being included in your training data, as a mix of English words and numerals (note the homophones in the last example to provide a degree of protection against noisy ASR results):

```none
12345
one eight hundred 2
183 twenty five
won too ate tin
```

### integer

Numbers are often important parts of a user utterance — the number of seconds for a timer, selecting an item from a list, etc. The `integer` slot expands to a mix of English number words ("one", "ten", "three thousand") and Arabic numerals (1, 10, 3000) to accommodate potential differences in ASR results. Negative numbers are supported.

| field          | type    | description                                                                                                                                   | default      |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `range`        | list    | a list of two integers representing the start (inclusive) and end (exclusive) of the numbers that will be sampled for inclusion in utterances | _(required)_ |
| `canon`        | boolean | only generate canonical number words (no homophones)                                                                                          | false        |
| `digits`       | boolean | generate numerical sequences as well as number words                                                                                          | true         |
| `ordinals`     | boolean | generate ordinal words (first, second, etc.)                                                                                                  | true         |
| `only_numbers` | boolean | only generate numerals (no words)                                                                                                             | false        |
| `only_words`   | boolean | only generate number words (no numerals)                                                                                                      | false        |

#### Example

```toml
[slots.number]
type = "integer"
range = [1, 10]
```

will result in the generation of integers and number words between 1 and 10:

```none
2
third
one
9
ate
```

### entity

An `entity` slot captures names of objects important to the domain. To include entities inline, simply list them as separate items in the `values` field.

For entities with a large number of values, it can be more convenient to list them in a separate file. To do that, group all your intents in a directory named `intents` and files containing entity data in a directory named `entities`. Leave out the `values` field; data will automatically be loaded from a file named `entities/<slot_name>.txt`. When [importing](/account/services/nlu) your data, include both `intents` and `entities` directories in your `.zip` file.

| field    | type | description             | default      |
| -------- | ---- | ----------------------- | ------------ |
| `values` | list | a list of entity values | _(required)_ |

#### Example

```toml
[slots.city]
type = "entity"
values = [
    "Paris",
    "London",
    ...
]
```

Alternatively:

```toml
[slots.city]
type = "entity"
# omit `values` and include a file named `entities/city.txt` containing one city per line
```

### selset

A `selset` slot represents an entity that has common paraphrases or synonyms that should be normalized to a canonical value. For instance, a camera app that can record both pictures and videos might wish to normalize input of "photo", "pic", "selfie", or "picture" to the word "photo" for easy processing.

#### Top-level slot fields

| field        | type | description                                                      |
| ------------ | ---- | ---------------------------------------------------------------- |
| `selections` | map  | a map of normalized names to aliases or synonyms for those terms |

#### Fields for each `selections` key

| field     | type | description                    | default      |
| --------- | ---- | ------------------------------ | ------------ |
| `aliases` | list | a list of synonyms for the key | _(required)_ |

#### Example

```toml
[slots.medium]
type = "selset"
selections.photo.aliases = ["picture", "pictures", "pic", "pics"]
selections.video.aliases = ["movie", "film"]
```

This is a sample configuration for the camera app described above. Possible capture media are "photo" and "video"; all aliases found in an utterance are returned to the app as one of those two words.

## Generator types

### list

A `list` generator relies on an inline list of values to generate expansions for the placeholder.

| field    | type | description                                              | default      |
| -------- | ---- | -------------------------------------------------------- | ------------ |
| `values` | list | list of strings to use as expansions for the placeholder | _(required)_ |

#### Example

```toml
[generators.request_opener]
type = "list"
values = [
    "I'd like",
    "find me",
    "how about",
    "we're looking for",
    # ...
]
```
