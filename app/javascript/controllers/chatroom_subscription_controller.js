import { Controller } from "@hotwired/stimulus"
// this is to create subscription 👇
import { createConsumer } from "@rails/actioncable"


// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static targets = ["messages"]
  static values = {
    chatroomId: Number
  }

  connect() {
    // this allows us to connect to rails websocket, it creates an instance
    // it needs one argument (the channel), in this case is the chatroom_channel
    console.log(`Subscribed to the chatroom with the id ${this.chatroomIdValue}.`)

    createConsumer().subscriptions.create(
        { channel: "ChatroomChannel", id: this.chatroomIdValue},
        { received: (data) => { this.#insertMessage(data) } }
        )

  }

    resetForm(event) {
      const form = event.target
      form.reset()
    }
    // private
    #insertMessage(data) {
      this.messagesTarget.insertAdjacentHTML("beforeend", data)
      // scroll to the bottom of the msgs list
      this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
    }
}
