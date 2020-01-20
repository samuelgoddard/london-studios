import React from "react"
import SimpleReactValidator from "simple-react-validator"
import { navigateTo } from "gatsby"

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.validator = new SimpleReactValidator();
  }

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
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, venue, date, enquiry } = this.state;
    return (
      <form
        name="Location Enquiry"
        onSubmit={this.handleSubmit}
        className="block w-full overflow-hidden"
        method="post"
        action="/thank-you"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" className="hidden" name="form-name" value="contact" />
        
        <div className="flex flex-wrap md:-mx-4">
					<div className="w-full md:w-1/2 lg:w-1/4 md:px-4 mb-5 md:mb-8">
						<label htmlFor="name" className="block">
							<span className="text-grey pb-1 block text-sm">Name:</span>
							<input type="text" name="name" id="name" className="input" placeholder="Enter Name" value={name} onChange={this.handleChange} />

							<span className="block mt-2 text-cream text-sm">
								{this.validator.message('name', name, 'required')}
							</span>
						</label>
					</div>

					<div className="w-full md:w-1/2 lg:w-1/4 md:px-4 mb-5 md:mb-8">
						<label htmlFor="email" className="block">
							<span className="text-grey pb-1 block text-sm">Email:</span>
							<input type="email" name="email" id="email" className="input" placeholder="Enter Email" value={email} onChange={this.handleChange} />

							<span className="block mt-2 text-cream text-sm">
								{this.validator.message('email', name, 'required|email')}
							</span>
						</label>
					</div>
					
					<div className="w-full md:w-1/2 lg:w-1/4 md:px-4 mb-5 md:mb-8">
						<label htmlFor="venue" className="block">
							<span className="text-grey pb-1 block text-sm">Venue:</span>
							<input type="text" name="venue" id="venue" className="input" placeholder="Venue" value={venue} onChange={this.handleChange} />

							<span className="block mt-2 text-cream text-sm">
								{this.validator.message('venue', name, 'required')}
							</span>
						</label>
					</div>

					<div className="w-full md:w-1/2 lg:w-1/4 md:px-4 mb-5 md:mb-8">
						<label htmlFor="date" className="block">
							<span className="text-grey pb-1 block text-sm">Date:</span>
							<input type="text" name="date" id="date" className="input" placeholder="Date" value={date} onChange={this.handleChange} />

							<span className="block mt-2 text-cream text-sm">
								{this.validator.message('venue', name, 'required')}
							</span>
						</label>
					</div>
				</div>

        <div className="flex flex-wrap items-end md:-mx-4">
					<div className="w-full md:flex-1 md:px-4">
						<label htmlFor="enquiry" className="block mb-5 md:mb-0">
							<span className="text-grey pb-1 block text-sm">Additional Information:</span>
							<textarea id="enquiry" name="enquiry" className="input mb-0" rows="4" value={enquiry} onChange={this.handleChange} placeholder="Enter Additional Information..."></textarea>
						</label>
					</div>
					<div className="w-full md:w-auto md:px-4">
          	<button type="submit" className="bg-cream px-3 pt-3 pb-2 text-black font-sans uppercase leading-none block w-full">Submit</button>
					</div>
        </div>
      </form>
    )
  }
}

export default Form
