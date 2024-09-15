
export default class QueryBuilder {

  constructor(baseUri = '') {
    this.baseUri = baseUri;
    this.params = new URLSearchParams();
  }

  // Método para agregar parámetros a la URI
  addParam(key, value) {
    if (value !== null && value !== undefined) {
      this.params.set(key, value);
    }
    return this;
  }

  // Método para obtener la URI construida
  build() {
    const queryString = this.params.toString();
    return queryString ? `${this.baseUri}?${queryString}` : this.baseUri;
  }
}