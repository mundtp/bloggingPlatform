import {User} from './models/models'

const ACTIONS = {
	registerUser: function(email,password) {
		console.log(email,password)
		return User.register(email,password).then((resp) => {
			return this.logUserIn(email,password)
		})
	},

	logUserIn: function(email,password) {
		return User.login(email,password).then(function(resp){
			location.hash = "home"
		})
	},

	logUserOut: function() {
		return User.logout().then(() => {
			location.hash = "login"
		})
	}
}

export default ACTIONS