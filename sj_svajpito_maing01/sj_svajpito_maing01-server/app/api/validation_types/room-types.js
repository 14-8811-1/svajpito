/* eslint-disable */

const roomListDtoInType = shape({
  state: string(),
});

const roomCreateDtoInType = shape({
  capacity: integer(2,20).isRequired(),
  name: string(1,20).isRequired()
})

const roomGetDtoInType = shape({
  id: id().isRequired(),
})
