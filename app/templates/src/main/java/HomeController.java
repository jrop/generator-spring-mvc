package <%= package %>;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
class HomeController {
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public @ResponseBody String index() {
		return "Hello World!";
	}
}
