# Encode give Utf-8 string to base64.
#
# @param str [String] String to encode.
# @return [String] Base64 encoded string.
utf8_to_b64 = (str) ->
    return window.btoa(encodeURIComponent(escape( str )))

# Decode base64 string to Utf-8 string.
#
# @param str [String] Base64 to decode.
# @return [String] Utf-8 string.
b64_to_utf8 = (str) ->
    return unescape(decodeURIComponent(window.atob( str )))

class @CounterValidationMode extends CheckoutMode
  ModeSwitcher.registerEntryPoint("counter_validation", @)

  @COOKIE = "mCV"

  title: -> "Locked"
  subtitle: -> "Need to validate counter."

  enter: ->
    super
    @switcher.setMenuEnabled(false)

    # If we have values for Counter in cookie storage, use them and
    # immediately switch to clerk login.
    code = $.cookie(@constructor.COOKIE)
    if code?
      data = JSON.parse(b64_to_utf8(code))
      @onResultSuccess(data)

  actions: -> [[
    @cfg.settings.counterPrefix,
    (code) => Api.counter_validate(
      code: code,
    ).then(@onResultSuccess, @onResultError)
  ]]

  onResultSuccess: (data) =>
    code = data["counter"]
    name = data["name"]
    @cfg.settings.counterCode = code
    @cfg.settings.counterName = name
    console.log("Validated #{code} as #{name}.")

    # Store values for next time so the mode can be skipped.
    $.cookie(@constructor.COOKIE, utf8_to_b64(JSON.stringify(
      counter: code
      name: name
    )))
    @switcher.switchTo(ClerkLoginMode)

  onResultError: (jqXHR) =>
    if jqXHR.status == 419
      console.log("Invalid counter code supplied.")
      return
    return true

  @clearStore: ->
    $.removeCookie(@COOKIE)
