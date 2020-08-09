/* HELPER FUNCTION TO GET/SET COOKIES */
function cookie() {
	function set(name, value, days) {
		var expires = "";
		// default to 60 days
		days = days ?? 60;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	}
	function get(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === " ") c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}
	function erase(name) {
		document.cookie = name + "=; Max-Age=-99999999;";
	}

	return {
		set,
		get,
		erase,
	};
}

export const cookieService = new cookie();
