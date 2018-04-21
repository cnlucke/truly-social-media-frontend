export default function commentsReducer(
  state = {
    activity: [],
  },
  action
) {
  switch (action.type) {
    case 'SET_ACTIVITY':
    console.log("updating activity!")
      return {...state, activity: [...action.payload] }
    default:
      return {...state};
  }
}
