/* Advanced Options */
const key = '';
const debug = false;

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// console.log("Hello. This message was sent from scripts/inject.js", $);
		// ----------------------------------------------------------

		setInterval(() => {
			var email = (document.querySelector('.c-conversation-profile__email') || {}).textContent;
			var url = `https://manage.meetingroom365.com/?auth=${ key }&impersonating=true&email=${ email }#/`;

			var domain = email && email.includes('@') ? email.split('@')[1] : null;
			var url2 = `https://dashboard.stripe.com/search?query=${ encodeURIComponent(domain || email) }`;

			if (!email) return;

			if (!document.querySelectorAll('.impersonate').length) {

				// c-conversation-profile__button c-conversation-profile__button-alike
				$('.c-conversation-profile__button .c-base-button__label').text('View Profile');

				$('.c-conversation-profile__actions').append(`<a href="${ url }" target="_blank" class="c-base-button impersonate c-base-button--blue c-base-button--small u-semibold c-base-button--block c-base-button--bordered c-base-button--inliner">
				<span class="c-base-button__inner"><svg class="c-base-icon c-base-button__icon c-base-button__icon--left" style="cursor: inherit; font-size: 16px; height: 16px; width: 16px;"><use xlink:href="#person"></use></svg><span class="c-base-button__label">Impersonate</span>
				</span>
				</a>`);

				$('.c-conversation-profile__actions').after('<div style="display: flex; margin-top: 8px;" class="links-wrapper"></div>');

				$('.links-wrapper').append(`<a href="${ url2 }" target="_blank" class="c-base-button stripe-link c-base-button--blue c-base-button--small u-semibold c-base-button--block c-base-button--bordered c-base-button--inliner" style="margin-right: 8px;">
				<span class="c-base-button__inner"><svg class="c-base-icon c-base-button__icon c-base-button__icon--left" style="cursor: inherit; font-size: 16px; height: 16px; width: 16px;"><use xlink:href="#person"></use></svg><span class="c-base-button__label">Stripe</span>
				</span>
				</a>`);

				$('.links-wrapper').append(`<a href="https://config-editor.meetingroom365.com/?email=${ email }" target="_blank" class="c-base-button admin-link c-base-button--blue c-base-button--small u-semibold c-base-button--block c-base-button--bordered c-base-button--inliner" style="">
				<span class="c-base-button__inner"><svg class="c-base-icon c-base-button__icon c-base-button__icon--left" style="cursor: inherit; font-size: 16px; height: 16px; width: 16px;"><use xlink:href="#person"></use></svg><span class="c-base-button__label">Admin Tools</span>
				</span>
				</a>`);
			} else {
				$('.impersonate').attr('href', url);

				$('.stripe-link').attr('href', url2);

				$('.admin-link').attr('href', `https://config-editor.meetingroom365.com/?email=${ email }`);
			}

		}, 222);

	}
	}, 10);
});
