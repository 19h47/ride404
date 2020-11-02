/*!
 * strings: 3.0.5
 * https://greensock.com
 *
 * Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
/* eslint-disable */

let _trimExp = /(^\s+|\s+$)/g;

export function getText(e) {
	let type = e.nodeType,
		result = "";
	if (type === 1 || type === 9 || type === 11) {
		if (typeof e.textContent === "string") {
			return e.textContent;
		} else {
			for (e = e.firstChild; e; e = e.nextSibling) {
				result += getText(e);
			}
		}
	} else if (type === 3 || type === 4) {
		return e.nodeValue;
	}
	return result;
}

export function splitInnerHTML(element, delimiter, trim) {
	let node = element.firstChild,
		result = [];
	while (node) {
		if (node.nodeType === 3) {
			result.push(
				...emojiSafeSplit(
					(node.nodeValue + "").replace(/^\n+/g, "").replace(/\s+/g, " "),
					delimiter,
					trim
				)
			);
		} else if ((node.nodeName + "").toLowerCase() === "br") {
			result[result.length - 1] += "<br>";
		} else {
			result.push(node.outerHTML);
		}
		node = node.nextSibling;
	}
	return result;
}

//smaller kb version that only handles the simpler emoji's, which is often perfectly adequate.

let _emoji =
		"[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D]|[\uD800-\uDBFF][\uDC00-\uDFFF]",
	_emojiExp = new RegExp(_emoji),
	_emojiAndCharsExp = new RegExp(_emoji + "|.", "g"),
	_emojiSafeSplit = (text, delimiter, trim) => {
		if (trim) {
			text = text.replace(_trimExp, "");
		}
		return (delimiter === "" || !delimiter) && _emojiExp.test(text)
			? text.match(_emojiAndCharsExp)
			: text.split(delimiter || "");
	};

export function emojiSafeSplit(text, delimiter, trim) {
	if (trim) {
		text = text.replace(_trimExp, "");
	}
	if (delimiter && delimiter !== "") {
		return text.replace(/>/g, "&gt;").replace(/</g, "&lt;").split(delimiter);
	}
	let result = [],
		l = text.length,
		i = 0,
		j,
		character;
	for (; i < l; i++) {
		character = text.charAt(i);
		result.push(character === ">" ? "&gt;" : character === "<" ? "&lt;" : character);
	}
	return result;
}
