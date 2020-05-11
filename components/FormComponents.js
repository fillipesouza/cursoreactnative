import { View,  } from 'react-native';
import { compose } from "recompose";
import {
    handleTextInput,
    withNextInputAutoFocusInput,
} from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from 'react-native-material-dropdown';

import { withNextInputAutoFocusForm } from "react-native-formik";

export const MyForm = withNextInputAutoFocusForm(View);

export const MyInput = compose(
    handleTextInput,
    withNextInputAutoFocusInput
)(TextField);

export const MyDropDown = compose(
    handleTextInput,
    withNextInputAutoFocusInput
)(Dropdown);

