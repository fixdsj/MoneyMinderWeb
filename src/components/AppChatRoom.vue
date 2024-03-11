<script setup>

</script>

<template>


  <!-- char-area -->
  <section class="message-area">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="chat-area">
            <!-- chatlist -->
            <div class="chatlist">
              <div class="modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="chat-header">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Rechercher" aria-label="search">
                      <button class="btn btn-outline-secondary" type="button"><i class="bi bi-plus-lg"></i></button>
                    </div>

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="Open-tab" data-bs-toggle="tab" data-bs-target="#Open"
                                type="button" role="tab" aria-controls="Open" aria-selected="true">Amis
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button class="nav-link" id="Closed-tab" data-bs-toggle="tab" data-bs-target="#Closed"
                                type="button" role="tab" aria-controls="Closed" aria-selected="false">Groupes
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div class="modal-body">
                    <!-- chat-list -->
                    <div class="chat-lists">
                      <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active " id="Open" role="tabpanel" aria-labelledby="Open-tab">
                          <!-- chat-list -->
                          <div class="chat-list">

                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Ryhan</h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Malek Hasan</h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Sadik Hasan</h3>
                                <p>front end developer</p>
                              </div>
                            </a>

                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Payel Akter</h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Baby Akter</h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Zuwel Rana</h3>
                                <p>front end developer</p>
                              </div>
                            </a>

                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Jalal Ahmed</h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Hasan Ali</h3>
                                <p>front end developer</p>
                              </div>
                            </a>

                          </div>
                          <!-- chat-list -->
                        </div>
                        <div class="tab-pane fade" id="Closed" role="tabpanel" aria-labelledby="Closed-tab">

                          <!-- chat-list -->
                          <div class="chat-list">
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                                <span class="active"></span>
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Mehedi Hasan</h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Ryhan</h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Malek Hasan</h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Sadik Hasan</h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Bulu </h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Maria SK</h3>
                                <p>front end developer</p>
                              </div>
                            </a>
                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Dipa Hasan</h3>
                                <p>front end developer</p>
                              </div>
                            </a>


                            <a href="#" class="d-flex align-items-center">
                              <div class="flex-shrink-0">
                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                     alt="user img">
                              </div>
                              <div class="flex-grow-1 ms-3">
                                <h3>Mehedi Hasan</h3>
                                <p>front end developer</p>
                              </div>
                            </a>

                          </div>
                          <!-- chat-list -->
                        </div>
                      </div>

                    </div>
                    <!-- chat-list -->
                  </div>
                </div>
              </div>
            </div>
            <!-- chatlist -->


            <!-- chatbox -->
            <div class="chatbox">
              <div class="modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="msg-head">
                    <div class="row">
                      <div class="col-8">
                        <div class="d-flex align-items-center">
                          <i class="bi bi-person-fill"></i>
                          <div class="flex-shrink-0">
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <h3>Mehedi Hasan</h3>
                            <p>Dernière connexion: 10:00 am</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <ul class="moreoption">
                          <li class="navbar nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Action</a></li>
                              <li><a class="dropdown-item" href="#">Another action</a></li>
                              <li>
                                <hr class="dropdown-divider">
                              </li>
                              <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>


                  <div class="modal-body">
                    <div class="msg-body">
                      <ul>
                        <li class="sender">
                          <p> Salut, t'es là ?</p>
                          <span class="time">10:06 am</span>
                        </li>
                        <li class="sender">
                          <p> Salut, t'es là ?</p>
                          <span class="time">10:16 am</span>
                        </li>
                        <li class="repaly">
                          <p>Oui !</p>
                          <span class="time">10:20 am</span>
                        </li>
                        <li class="sender">
                          <p> Salut, t'es là ?</p>
                          <span class="time">10:26 am</span>
                        </li>
                        <li class="sender">
                          <p> Salut, t'es là ?</p>
                          <span class="time">10:32 am</span>
                        </li>
                        <li class="repaly">
                          <p>Comment vas-tu?</p>
                          <span class="time">10:35 am</span>
                        </li>
                        <li>
                          <div class="divider">
                            <h6>Aujourd'hui</h6>
                          </div>
                        </li>

                        <li class="repaly">
                          <p>Oui, dis-moi</p>
                          <span class="time">10:36 am</span>
                        </li>
                        <li class="repaly">
                          <p>Oui... je suis dessus</p>
                          <span class="time">Maintenant</span>
                        </li>

                      </ul>
                    </div>
                  </div>


                  <div class="send-box">
                    <form action="">
                      <input type="text" class="form-control" aria-label="message…" placeholder="Ecrire un message…">
                      <button type="button" class="btn btn-primary" aria-hidden="true"> Envoyer</button>
                    </form>


                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- chatbox -->


        </div>
      </div>
    </div>

  </section>
  <!-- char-area -->

</template>

<style scoped>

/* HTML5 display-role reset for older browsers */


/* *******************************
message-area
******************************** */

.message-area {
  padding: 20px 0;
  background: #f5f5f5;
}

.chat-area {
  position: relative;
  width: 100%;
  background-color: #fff;
  border-radius: 0.3rem;
  height: 90vh;
  overflow: hidden;
  min-height: calc(100% - 1rem);
}

.chatlist {
  outline: 0;
  height: 100%;
  overflow: hidden;
  width: 300px;
  float: left;
  padding: 15px;
}

.chat-area .modal-content {
  border: none;
  border-radius: 0;
  outline: 0;
  height: 100%;
}

.chat-area .modal-dialog-scrollable {
  height: 100% !important;
}

.chatbox {
  width: auto;
  overflow: hidden;
  height: 100%;
  border-left: 1px solid #ccc;
}

.chatbox,
.chatlist {
  max-width: 100%;
  margin: 0;
}


.chat-area .form-control {
  display: block;
  width: 80%;
  padding: 0.375rem 0.75rem;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #222;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.chat-area .form-control:focus {
  outline: 0;
  box-shadow: inherit;
}

a.add img {
  height: 36px;
}

.chat-area .nav-tabs {
  border-bottom: 1px solid #dee2e6;
  align-items: center;
  justify-content: space-between;
  flex-wrap: inherit;
}

.chat-area .nav-tabs .nav-item {
  width: 100%;
}

.chat-area .nav-tabs .nav-link {
  width: 100%;
  color: #180660;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  text-transform: capitalize;
  margin-top: 5px;
  margin-bottom: -1px;
  background: 0 0;
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.chat-area .nav-tabs .nav-item.show .nav-link,
.chat-area .nav-tabs .nav-link.active {
  color: #222;
  background-color: #fff;
  border-color: transparent transparent #000;
}

.chat-area .nav-tabs .nav-link:focus,
.chat-area .nav-tabs .nav-link:hover {
  border-color: transparent transparent #000;
  isolation: isolate;
}

.chat-list h3 {
  color: #222;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  text-transform: capitalize;
  margin-bottom: 0;
}

.chat-list p {
  color: #343434;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  text-transform: capitalize;
  margin-bottom: 0;
}

.chat-list a.d-flex {
  margin-bottom: 15px;
  position: relative;
  text-decoration: none;
}


.msg-head h3 {
  color: #222;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 0;
}

.msg-head i {
  font-size: 2.3em;
}

.msg-head p {
  color: #343434;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  text-transform: capitalize;
  margin-bottom: 0;
}

.msg-head {
  padding: 15px;
  border-bottom: 1px solid #ccc;
}

.moreoption {
  display: flex;
  align-items: center;
  justify-content: end;
}

.moreoption .navbar {
  padding: 0;
}

.moreoption li .nav-link {
  color: #222;
  font-size: 16px;
}

.moreoption .dropdown-toggle::after {
  display: none;
}

.moreoption [data-bs-popper] {
  top: 100%;
  left: auto;
  right: 0;
  margin-top: 0.125rem;
}

.msg-body ul {
  overflow: hidden;
}

.msg-body ul li {
  list-style: none;
  margin: 15px 0;
}

.msg-body ul li.sender {
  display: block;
  width: 100%;
  position: relative;
}

.msg-body ul li.sender:before {
  display: block;
  clear: both;
  content: '';
  position: absolute;
  top: -6px;
  left: -7px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 12px 15px 12px;
  border-color: transparent transparent #f5f5f5 transparent;
  -ms-transform: rotate(-37deg);
  transform: rotate(-37deg);
}

.msg-body ul li.sender p {
  color: #000;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  padding: 15px;
  background: #f5f5f5;
  display: inline-block;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 0;
}

.msg-body ul li.sender p b {
  display: block;
  color: #180660;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
}

.msg-body ul li.repaly {
  display: block;
  width: 100%;
  text-align: right;
  position: relative;
}

.msg-body ul li.repaly:before {
  display: block;
  clear: both;
  content: '';
  position: absolute;
  bottom: 15px;
  right: -7px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 12px 15px 12px;
  border-color: transparent transparent #4b7bec transparent;
  -ms-transform: rotate(37deg);
  transform: rotate(37deg);
}

.msg-body ul li.repaly p {
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  padding: 15px;
  background: #4b7bec;
  display: inline-block;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-bottom: 0;
}

.msg-body ul li.repaly p b {
  display: block;
  color: #061061;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
}

.msg-body ul li.repaly:after {
  display: block;
  content: '';
  clear: both;
}

.time {
  display: block;
  color: #000;
  font-size: 12px;
  line-height: 1.5;
  font-weight: 400;
}

li.repaly .time {
  margin-right: 20px;
}

.divider {
  position: relative;
  z-index: 1;
  text-align: center;
}

.msg-body h6 {
  text-align: center;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.5;
  color: #222;
  background: #fff;
  display: inline-block;
  padding: 0 5px;
  margin-bottom: 0;
}

.divider:after {
  display: block;
  content: '';
  clear: both;
  position: absolute;
  top: 12px;
  left: 0;
  border-top: 1px solid #EBEBEB;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.send-box {
  padding: 15px;
  border-top: 1px solid #ccc;
}

.send-box form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.send-box .form-control {
  display: block;
  width: 85%;
  padding: 0.375rem 0.75rem;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #222;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}


.add-apoint a {
  text-decoration: none;
  background: #F6F7FA;
  border-radius: 8px;
  padding: 8px 8px;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.2;
  color: #343945;
}

.add-apoint a svg {
  margin-right: 5px;
}


.closess i {
  display: none;
}


@media (max-width: 767px) {

  .chatlist {
    width: 100%;
  }

  .chatbox {
    width: 100%;
    position: absolute;
    left: 1000px;
    right: 0;
    background: #fff;
    transition: all 0.5s ease;
    border-left: none;
  }

  .msg-head h3 {
    font-size: 14px;
  }

  .msg-head p {
    font-size: 12px;
  }

  .msg-head .flex-shrink-0 img {
    height: 30px;
  }

  .send-box button {
    width: 28%;
  }

  .send-box .form-control {
    width: 70%;
  }

  .chat-list h3 {
    font-size: 14px;
  }

  .chat-list p {
    font-size: 12px;
  }

  .msg-body ul li.sender p {
    font-size: 13px;
    padding: 8px;
    border-bottom-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .msg-body ul li.repaly p {
    font-size: 13px;
    padding: 8px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
}
</style>