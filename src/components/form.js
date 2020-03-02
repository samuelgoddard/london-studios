import React from "react"
import SimpleReactValidator from "simple-react-validator"
import { navigate } from "gatsby"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      name: '',
      email: '',
      venue: '',
      enquiry: '',
      industry: '',
    };
  }

  componentWillMount() {
    this.validator = new SimpleReactValidator();
  }

  handleDate = date => {
    this.setState({
      startDate: date,
      date: moment(date).format("MMM Do YYYY"),
    });
  };

  handleSubmit = e => {
    if (this.validator.allValid()) {
      const form = e.target;
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": form.getAttribute("name"),
          ...this.state
        })
      })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  selectChange = e => this.setState({ venue: e.target.value });
  industryChange = e => this.setState({ industry: e.target.value });

  render() {
		const { name, email, enquiry, startDate, industry } = this.state;
		const color = { color: this.props.color }

    return (
      <form
        name="Location Enquiry"
        onSubmit={this.handleSubmit}
        className="block w-full overflow-hidden"
        method="post"
        action="/thank-you"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <p className="hidden">
          <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
        </p>
        
        <div className="flex flex-wrap md:-mx-6">
          <div className="w-full md:w-1/2 md:px-6">
            <div className="w-full mb-5">
              <label htmlFor="name" className="block">
                <span className="text-black pb-1 block text-base">Name:</span>
                <input type="text" name="name" id="name" className="input" placeholder="Enter Name" value={name} onChange={this.handleChange} />

                <span style={color} className="block mt-2 text-sm">
                  {this.validator.message('name', name, 'required')}
                </span>
              </label>
            </div>

            <div className="w-full mb-5">
              <label htmlFor="email" className="block">
                <span className="text-black pb-1 block text-base">Email:</span>
                <input type="email" name="email" id="email" className="input" placeholder="Enter Email" value={email} onChange={this.handleChange} />

                <span style={color} className="block mt-2 text-sm">
                  {this.validator.message('email', email, 'required|email')}
                </span>
              </label>
            </div>
        
            <div className="w-full mb-5">
              <label htmlFor="venue" className="block">
                <span className="text-black pb-1 block text-base">Venue:</span>

                <select name="venue[]" id="venue" className="input" onBlur={this.selectChange}>
                  <option value="all">Venue</option>
                  <option value="spitalfields">Spitalfields</option>
                  <option value="newoxford">New Oxford</option>
                  <option value="hammersmith">Hammersmith</option>
                  <option value="chancerylane">Chancery Lane</option>
                </select>
              </label>
            </div>

            <div className="w-full mb-5">
              <label htmlFor="date" className="block">
                <span className="text-black pb-1 block text-base">Date:</span>

                <DatePicker
                  name="date"
                  className="input text-white w-full"
                  selected={startDate}
                  onChange={date => this.handleDate(date)} 
                  dateFormat="d MMMM yyyy"
                />
              </label>
            </div>

            <div className="w-full mb-0 pb-0">
              <label htmlFor="industry" className="block">
                <span className="text-black pb-1 block text-base">Industry:</span>

                <select name="industry[]" id="industry" className="input" onBlur={this.industryChange}>
                  <option value="all">Industry Type</option>
                  <option value="eventsagency">Events Agency</option>
                  <option value="brand">Brand</option>
                  <option value="individual">Individual</option>
                  <option value="propertyowner">Property Owner</option>
                  <option value="propertyagent">Property Agent</option>
                  <option value="developer">Developer</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
          </div>

          <div className="w-full md:w-1/2 md:px-6 h-auto mb-0 pb-0">
            <div className="w-full h-full mb-0 pb-0">
              <label htmlFor="enquiry" className="block h-full">
                <span className="text-black pb-1 block text-base sr-only">Additional Information:</span>
                <textarea id="enquiry" name="enquiry" className="input mb-0 h-full pt-8" rows="4" value={enquiry} onChange={this.handleChange} placeholder="Enter Additional Information..."></textarea>
              </label>
            </div>
          </div>
        </div>
        <div className="ml-auto mt-5">
          <button type="submit" className="px-3 pt-3 pb-2 text-black font-sans uppercase leading-none block bg-cream ml-auto">Submit</button>
        </div>
      </form>
    )
  }
}

export default Form
