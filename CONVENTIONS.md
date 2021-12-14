### Pages

1. pages will be located under src/pages/\<pageName>/\<page>.tsx
2. necessary components, that are not generic will be located under /src/pages/\<pageName>/\<componentName>.\<page>.tsx

### Generic Components

ie. navbar, footer, card, modal, etc.

1. components will be located under src/components/\<componentName>/\<componentName>.tsx
2. necessary sub components will be located under src/components/\<componentName>/\<subComponentName>.\<componentName>.tsx

### Icons

- located under src/static/icons/\<icon>.tsx

### CSS (**IF NECESSARY**)

css should mainly be used in conjunction with @material-ui

#### Example

```ts
import { green } from "@material-ui/core";
const useStyles = makeStyles(() =>
  createStyles({
    className: {
      height: "100px",
    },
    className2: {
      color: green || "#ffffff",
    },
  })
);

const Component = () => {
  const classes = useStyles();
  return (
    <div className={classes.className}>
      <span className={classes.className2}>Hi</span>
    </div>
  );
};
```

If you need to use regular CSS

- css files should be located under src/static/css/\<pageName>/\<componentOrPageName>.css

## FAQ

**Why don't we use scss/sass?**

- we are using **@material-ui**, for this project, css and theming will be handled by **@material-ui** as well, so we make sure to use it.

**Can I implmenet scss/sass for the project?**
Yes, if necessary. (.scss/.sass should be located in the same folder as the compiled css)

**Which state-manager are we going to use?**
Either the builtin **context** or **redux**. Feel free to set that up. (src/store/\<storeName>/\<storeName>.tsx)
