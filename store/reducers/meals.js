import { MEALS } from "../../data/dummy-data";

const initialState = {
    meals : MEALS,
    cartMeals : []
};

export default (state = initialState, action) => {
    return state;
}