import { makeStyles } from "@mui/styles";
import colors from "../../../../utils/theme/base/colors";

const { orange } = colors;

export const useBooksStyle = makeStyles(() => ({
   
    booksContainer: {
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: orange.main,
    }
   
}));
