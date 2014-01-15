!function( $ ) {

  "use strict"

 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function ( element, options ) {
    this.init('tooltip', element, options)
  }
  
  var dataType,
      theme
  
  Tooltip.prototype = {
   constructor: Tooltip,
   init: function ( type, element, options ) {
      var eventIn,
          eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    },

    getOptions: function ( options ) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay,
          hide: options.delay
        }
      }
      return options
    },

    enter: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)
	  
	  if ($(e.currentTarget).attr("data-tooltip-type")==undefined || $(e.currentTarget).attr("data-tooltip-type") == "") dataType = this.options.dataType
	  else dataType = $(e.currentTarget).attr("data-tooltip-type")
	  
	  if ($(e.currentTarget).attr("data-theme")==undefined || $(e.currentTarget).attr("data-theme") == "") theme = this.options.theme
	  else theme = $(e.currentTarget).attr("data-theme")
		 
      if (!self.options.delay || !self.options.delay.show) {
        self.show(dataType,theme)
      } else {
        self.hoverState = 'in'
        setTimeout(function() {
          if (self.hoverState == 'in') {
            self.show(dataType,theme)
          }
        }, self.options.delay.show)
      }
    },

    leave: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)
	  
      if (!self.options.delay || !self.options.delay.hide) {
        self.hide()
      } else {
        self.hoverState = 'out'
        setTimeout(function() {
          if (self.hoverState == 'out') {
            self.hide()
          }
        }, self.options.delay.hide)
      }
    },

    show: function (dataType,theme) {
      var $tip,
          inside,
          pos,
          elementWidth,
          elementHeight,
          placement,
          tp
		 
	 
      if (this.hasContent() && this.enabled) {
        $tip = this.tip()

        this.setContent(dataType)

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement
		
        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        elementWidth = $tip[0].offsetWidth
        elementHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - elementWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - elementHeight, left: pos.left + pos.width / 2 - elementWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - elementHeight / 2, left: pos.left - elementWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - elementHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
		  .addClass(this.options.theme)
      }
    },

    setContent: function (dataType) {
      var $tip = this.tip()
	  var content
	  
	  if (dataType == "text")
      	content = this.getTitle()
	  else if (dataType == "id") {
		content = $(this.getTitle()).html() }
	  else if (dataType == "function") {
		content = eval(this.getTitle()) }
	  else if (dataType == "url") {		 
		 $.ajax({
			url: ""+this.getTitle()+"",
			type: 'get',
			dataType: 'html',
			async: false,
			success: function(data) {
				content = data;
			} 
		 });
	  }

	  $tip.find('.tooltip-inner').html(content)
      $tip.removeClass('fade in top bottom left right')
    },

    hide: function () {
      var that = this,
          $tip = this.tip()

      $tip.removeClass('in').remove()
    },

    fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    },

    hasContent: function () {
      return this.getTitle()
    },

    getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth,
        height: this.$element[0].offsetHeight
      })
    },

    getTitle: function () {
      var title,
          $e = this.$element,
          o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      title = title.toString().replace(/(^\s*|\s*$)/, "")

      return title
    },

    tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    },

    validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    },

    enable: function () {
      this.enabled = true
    },

    disable: function () {
      this.enabled = false
    },

    toggleEnabled: function () {
      this.enabled = !this.enabled
    },

    toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data('tooltip'),
          options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    delay: 0,
    selector: false,
    placement: 'top',		//top, left, bottom, right
    trigger: 'hover',		// hover, focus
    title: '',
	html:'true',
	dataType:'text',
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    theme:'dark' 			//light, dark
  }

}( window.jQuery )