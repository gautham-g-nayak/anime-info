import { http } from '../utils/http'

function getAnimeContent() {
  return http.get(`getContent`)
}

export { getAnimeContent }
