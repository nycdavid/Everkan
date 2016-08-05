class CardFacade {
  constructor(response) {
    this.id = response._id;
    this.name = response.name;
    this.dueDate = response.dueDate;
  }
}

export default CardFacade;
