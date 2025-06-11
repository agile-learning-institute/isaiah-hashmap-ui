# JavaScript HashMap & HashSet Implementation

A custom-built implementation of `HashMap` and `HashSet` in JavaScript with collision handling, dynamic resizing, and a web UI for easy interaction and testing.

## Overview

This project replicates core behaviors of hash-based data structures, demonstrating how keys are hashed, collisions are managed, and capacity is scaled. A simple and interactive UI is included to manipulate and test the data structures in real time.

## Features

### HashMap
- `set(key, value)`, `get(key)`, `has(key)`, `remove(key)`, `length()`, `clear()`, `keys()`, `values()`, `entries()`
- Collision handling with separate chaining
- Dynamic resizing when load factor is exceeded
- Protection against out-of-bounds access

### HashSet
- Stores unique keys (no values)
- `add`, `has`, `remove`, `clear`, `keys`, `length`

## Unit Testing

Click the **Run Tests** button in the UI to validate core features of both structures.

## Web UI

Use the HTML interface to interact with both `HashMap` and `HashSet`.

## Usage

1. Download or clone the repository
2. Open `index.html` in your browser
3. Use the form and buttons to interact with the data structures

## Files

- `index.html` – Interactive UI and logic
- `README.md` – Project documentation
