import gql from 'graphql-tag'

function CreateMem(file, values) {
  const formData = new FormData()
  const eventID = Math.floor(Math.random() * 1000000000000) + 1
  formData.append('file', file)

  const CREATE_EVENT = gql`
    mutation PostMutation(
      $eventID: ID
      $name: String
      $date: _Neo4jDateInput
      $image: String
      $favourite: Boolean
      $broadcast: Boolean
    ) {
      CreateEvent(
        eventID: $eventID
        name: $name
        date: $date
        image: $image
        favourite: $favourite
        public: $broadcast
      ) {
        eventID
        name
        date {
          day
          month
          year
        }
        image
        favourite
        public
      }
    }
  `

  fetch(
    `${window.location.protocol}//${window.location.hostname}:9001/uploads`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((response) =>
      // submit(eventID, values.memName, values.memDate, response.data, values.favourite, values.broadcast))
      console.log('Image URL is: ' + response.data)
    )
    .then(console.log('Type is: ' + values.memType))
    .then(console.log('Name is: ' + values.eventName))
    .then(console.log('Date is: ' + values.memDate))
    .then(console.log('Favourite is: ' + values.favourite))
    .then(console.log('Public is: ' + values.broadcast))

    .catch((error) => {
      console.error('There has been a problem uploading your image', error)
    })
}

export default CreateMem
