# ui Folder

`src/ui` is the app-owned home for reusable components that have been extracted from `src/template` or built directly for the product.

## Workflow

1. Check `src/ui` first before building a feature.
2. Reuse or extend an existing component here when it already solves the need.
3. Only if the component does not exist here, inspect `src/template` for the closest source implementation.
4. Extract only the required template pieces into `src/ui`.
5. Remove demo data, template-only wiring, and unused styles during extraction.

The goal is to keep growing a standalone local UI kit until `src/template` can be deleted entirely.
