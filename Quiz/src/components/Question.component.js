import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ReactPlayer from "react-player";

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 20,
      usersCollection: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/users/get/")
      .then((res) => {
        console.log(res.data);
        this.setState({ usersCollection: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
          alert("Times UP!");
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  UrgeWithPleasureComponent = () => (
    <CountdownCircleTimer
      size={100}
      isPlaying
      duration={20}
      //   onComplete={ alert("Times UP!")}

      colors={[
        ["#004777", 0.33],
        ["#F7B801", 0.33],
        ["#A30000", 0.33],
      ]}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );

  render() {
    const { minutes, seconds } = this.state;
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10 col-lg-10">
            <div className="border">
              <div className="question bg-white p-3 border-bottom">
                <div className="d-flex flex-row justify-content-between align-items-center mcq">
                  <h4>Quiz</h4>
                  <span>
                    {this.UrgeWithPleasureComponent()}
                    {/* Time Remaining:
                    <b>
                      {" "}
                      {minutes}:{seconds}{" "}
                    </b> */}
                  </span>
                </div>
              </div>
              {this.state.usersCollection.map((itemObject) => {
                return (
                  <div className="question bg-white p-3 border-bottom">
                    {itemObject.type == "video" ? (
                      <div className="d-flex flex-row align-items-center question-title">
                        <ReactPlayer url={itemObject.question} playing={true} />
                      </div>
                    ) : itemObject.type == "img" ? (
                      <div className="d-flex flex-row align-items-center question-title">
                        <h3 className="text-danger">Q.</h3>
                        <img
                          src={itemObject.question}
                          className="mt-1 ml-2"
                        />
                      </div>
                    ) : (
                      <div className="d-flex flex-row align-items-center question-title">
                        <h3 className="text-danger">Q.</h3>
                        <h5 className="mt-1 ml-2">{itemObject.question}</h5>
                      </div>
                    )}
                    {itemObject.option1 !== "" ? (
                      <>
                        <div className="ans ml-2">
                          <label className="radio">
                            <input
                              type="radio"
                              name="option1"
                              value={itemObject.option1}
                            />
                            <span>{itemObject.option1}</span>
                          </label>
                        </div>

                        <div className="ans ml-2">
                          <label className="radio">
                            <input
                              type="radio"
                              name="otion2"
                              value={itemObject.option2}
                            />
                            <span>{itemObject.option2}</span>
                          </label>
                        </div>
                        <div className="ans ml-2">
                          <label className="radio">
                            <input
                              type="radio"
                              name="answer"
                              value={itemObject.option3}
                            />
                            <span>{itemObject.option3}</span>
                          </label>
                        </div>
                        <div className="ans ml-2">
                          <label className="radio">
                            <input
                              type="radio"
                              name="answer"
                              value={itemObject.answer}
                            />
                            <span>{itemObject.answer}</span>
                          </label>
                        </div>
                      </>
                    ) : (
                      <div className="ans ml-2">
                        <label className="text">
                          {" "}
                          <input type="text" name="answer" value="" />
                        </label>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                <button
                  className="btn btn-primary d-flex align-items-center btn-danger"
                  type="button"
                >
                  <i className="fa fa-angle-left mt-1 mr-1"></i>&nbsp;previous
                </button>
                <button
                  classNam
                  e="btn btn-primary border-success align-items-center btn-success"
                  type="button"
                >
                  Next<i className="fa fa-angle-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
