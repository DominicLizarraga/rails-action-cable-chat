import { Controller } from "@hotwired/stimulus"
// this is to create subscription 👇
import { createConsumer } from "@rails/actioncable"


// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static targets = ["messages"]
  static values = {
    chatroomId: Number
  }
  static values = { chatroomId: Number, currentUserId: Number }


  connect() {
    // this allows us to connect to rails websocket, it creates an instance
    // it needs one argument (the channel), in this case is the chatroom_channel

    this.channel = createConsumer().subscriptions.create(
        { channel: "ChatroomChannel", id: this.chatroomIdValue},
        { received: data => this.#insertMessageAndScrollDown(data) }
          console.log(`Subscribed to the chatroom with the id ${this.chatroomIdValue}.`)
        )
      }



   #justifyClass(currentUserIsSender) {
      return currentUserIsSender ? "justify-content-end" : "justify-content-start"
    }

    #userStyleClass(currentUserIsSender) {
      return currentUserIsSender ? "sender-style" : "receiver-style"
    }

    #buildMessageElement(currentUserIsSender, message) {
      return `
        <div class="message-row d-flex ${this.#justifyClass(currentUserIsSender)}">
          <div class="${this.#userStyleClass(currentUserIsSender)}">
            ${message}
          </div>
        </div>
      `
    }

    disconnect() {
      console.log("Unsubscribed from the chatroom")
      this.channel.unsubscribe()
    }

    resetForm(event) {
      const form = event.target
      form.reset()
    }


    #insertMessageAndScrollDown(data) {
      const currentUserIsSender = this.currentUserIdValue === data.sender_id
      const messageElement = this.#buildMessageElement(currentUserIsSender, data.message)
      this.messagesTarget.insertAdjacentHTML("beforeend", messageElement)
      this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
    }

  }
