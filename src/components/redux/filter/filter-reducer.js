import { createReducer } from "@reduxjs/toolkit";
import { updateFilter } from "./filter-actions";

const filter = '';

export default createReducer(filter, {
    [updateFilter]: (_, { payload }) => payload,
});