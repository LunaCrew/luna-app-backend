# Architecture

## Model-View-Controller-Service (MSC) Architecture

The `accounts-code` project uses **MSC** architecture, which stands for **Model-View-Controller-Service**. It's an extension of the traditional **MVC (Model-View-Controller)** design pattern, adding an additional layer for **Service**.

The MSC design pattern allows for better separation of concerns, making your code more modular, easier to maintain, and promoting code reuse.

## Components

### Model

This is the data layer of the application. It represents the application's data structure, often corresponding to database tables. It contains the logic to retrieve and store data in the database.

### View

This is the presentation layer of the application. It's responsible for displaying the data provided by the Model in a format that the user can understand and interact with.

### Controller

This is the layer that handles user input. It interacts with both the Model and the View. It receives user input, manipulates the Model based on that input, and updates the View to reflect changes in the Model.

### Service

This is an additional layer that contains business logic. It's used to write code that doesn't naturally fit into Models or Controllers. For example, if you have a complex operation that involves multiple models, you might put that logic in a Service instead of bloating your Controller or Model with code that doesn't directly relate to their primary responsibilities.

---
> 📍 *You are here*

| [Index](index) | [Stacks](stacks) | [📍 Architecture](architecture) | [References](references) | [License](https://github.com/LunaCrew/accounts-core/blob/main/LICENSE.md) |
