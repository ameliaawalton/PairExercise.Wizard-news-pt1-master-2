var html = require("html-template-tag");
// - or - import { html } from "html-template-tag";

var names = ["Antonio", "Megan", "/><script>alert('xss')</script>"];
var string = html`
	<ul>
		${names.map((name) => html`
			<li>Hello, ${name}!</li>
		`)}
	</ul>
`;
// "<ul><li>Hello, Antonio!</li><li>Hello, Megan!</li><li>Hello, /&gt;&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;!</li></ul>"