import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        type: "dark",
    },
    typography: {
        fontFamily: [
            "-apple-system",
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Oxygen',
            'Ubuntu',
            'Cantarell',
            'Fira Sans',
            'Droid Sans',
            'Helvetica Neue',
        ].join(",")
    },
    mixins: {
        toolbar: {
            backgroundColor: "#515151"
        }
    },
    overrides: {
        MuiInputLabel: {
            outlined: {
                paddingLeft: 2,
                paddingRight: 2
            }
        }
    }
});
