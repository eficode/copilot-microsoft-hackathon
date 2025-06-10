# Summary
This document provides instructions for using GitHub Copilot in the DotnetMcpServerTest project.
It includes guidelines for code style, project structure, and solution-level changes to ensure
consistency and maintainability across the codebase.

# General requirements
- Comment all public methods, properties, and classes in the codebase
- Use XML documentation comments for public APIs to ensure they are discoverable in IDEs and documentation generators
- Use PascalCase for public members (classes, methods, properties)
- Use camelCase for private members and method parameters
- Use meaningful names for variables, methods, and classes to enhance code readability
- Avoid using abbreviations or acronyms unless they are widely recognized
- Keep methods short and focused on a single responsibility
- Add CreatedBy and LastModifiedBy placeholders for new public classes and methods as a comment

# Copilot instructions for tech stack and project structure
- Use this section when reviewing code changes, creating new projects or when adding new dependencies
- Use .NET 9 as the target framework for all projects
- Use the latest C# language features available in .NET 8, but at least C# 10
- All the test must be placed under ToolsCoreWebApi.UnitTests project
- The project should be structured to follow the Clean Architecture principles
- Use XUnit for unit testing
- Use Moq for mocking dependencies in unit tests
- Use FluentAssertions for more readable assertions in unit tests
