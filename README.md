# Propositions for a new DSL for Open API

## Objectives
- It must be fast to write, i.e, it most reduce most of the code in a yaml not just replace it
- It must be based on a well known programming language with validation and auto completion
- It must be easy to learn
- It must be restricted. The developer can't do more than the Open API allows.
- It must be able to represent everything OpenAPI can. 

## Problems with the current solutions
All current DSLs I could find failed on one or more of the requirements above. Most of them are not much faster to write than YAML or have a representation power not restricted to OpenAPI, which leads to errors when a developer writes types valid for the language, but not valid for OpenAPI.

## Current propositions
The current proposition is written in Typescript and completely abandons the concept of translating language types to OpenAPI types, since this can lead to many problems (different representation powers). Instead, types are instances, real values of the entity Type, imported from the DSL library. The current proposition also combines definitions that are commonly related in OpenAPI, sets global configurations and adopt default values, which is able to reduce much of the code needed.
