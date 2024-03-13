///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
	var flex = document.createElement("div")
	flex.style.display = "flex"
	flex.style.flexDirection = "column"
	flex.style.rowGap = "1px"

	flex.appendChild(document.createElement("div"))
	flex.appendChild(document.createElement("div"))

	document.body.appendChild(flex)
	var isSupported = flex.scrollHeight === 1
	flex.parentNode.removeChild(flex)
	console.log(isSupported)

	if (!isSupported) document.body.classList.add("no-flexbox-gap")
}
checkFlexGap()

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

// Mobile Navigation

const btnNavEl = document.querySelector(".btn-mobile-nav")
const headerEl = document.querySelector(".header")
btnNavEl.addEventListener("click", () => {
	headerEl.classList.toggle("nav-open")
})

///////////////////////////////
// Smooth scrolling animation
///////////////////////////////
// only selecting anchor elements with href set

const allLinks = document.querySelectorAll("a:link")
allLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault()
		const href = link.getAttribute("href")
		// scroll back to top
		if (href === "#") {
			window.scrollTo({ top: 0, behavior: "smooth" })
		}
		// scroll to other links
		if (href !== "#" && href.startsWith("#")) {
			const sectionEl = document.querySelector(href)
			sectionEl.scrollIntoView({ behavior: "smooth" })
		}
		// close mobile navigation
		if (link.classList.contains("main-nav-link")) {
			headerEl.classList.toggle("nav-open")
		}
	})
})

// Sticky Navigation
const sectionHeroEl = document.querySelector(".section-hero")
const observer = new IntersectionObserver(
	(entries) => {
		const ent = entries[0]
		if (ent.isIntersecting === false) {
			document.body.classList.add("sticky")
		}
	},
	{
		// in the viewport
		root: null,
		threshold: 0,
	}
)
observer.observe(sectionHeroEl)
