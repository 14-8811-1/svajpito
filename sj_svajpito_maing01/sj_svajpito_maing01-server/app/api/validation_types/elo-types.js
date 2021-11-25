/* eslint-disable */

const eloListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(0, null),
    pageSize: integer(0, null)
  })
})

const eloUpdateDtoInType = shape({
  players: array(shape({
    uuIdentity: uuIdentity().isRequired(),
    score: number().isRequired()
  })).isRequired(),
})
