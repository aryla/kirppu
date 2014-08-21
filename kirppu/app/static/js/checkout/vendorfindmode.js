// Generated by CoffeeScript 1.7.1
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  this.VendorFindMode = (function(_super) {
    __extends(VendorFindMode, _super);

    ModeSwitcher.registerEntryPoint("vendor_find", VendorFindMode);

    function VendorFindMode() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.createRow = __bind(this.createRow, this);
      this.onVendorsFound = __bind(this.onVendorsFound, this);
      this._findBy = __bind(this._findBy, this);
      this.findName = __bind(this.findName, this);
      this.findEmail = __bind(this.findEmail, this);
      this.findPhoneNumber = __bind(this.findPhoneNumber, this);
      this.findId = __bind(this.findId, this);
      this.onVendorSearch = __bind(this.onVendorSearch, this);
      VendorFindMode.__super__.constructor.apply(this, args);
      this._dummy = {
        id: "42",
        name: "Erkki Esimerkki",
        email: "erkki@example.org",
        phone: "0123456789"
      };
    }

    VendorFindMode.prototype.title = function() {
      return "Vendor Search";
    };

    VendorFindMode.prototype.subtitle = function() {
      return "" + this.cfg.settings.clerkName + " @ " + this.cfg.settings.counterName;
    };

    VendorFindMode.prototype.columns = function() {
      return ['<th class="receipt_index">#</th>', '<th class="receipt_code">id</th>', '<th class="receipt_item">name</th>', '<th class="receipt_item">email</th>', '<th class="receipt_item">phone</th>'].map($);
    };

    VendorFindMode.prototype.actions = function() {
      return [["", this.onVendorSearch]];
    };

    VendorFindMode.prototype.onVendorSearch = function(query) {
      return (query.trim() === "" ? (function() {}) : query.match(/^[0-9\s]+$/) != null ? this.findPhoneNumber : query.match(/^#[0-9]+$/) != null ? this.findId : query.match(/@/) != null ? this.findEmail : this.findName)(query);
    };

    VendorFindMode.prototype.findId = function(query) {
      query = query.replace(/#/, '');
      return this.onVendorsFound(this._findBy('id', query));
    };

    VendorFindMode.prototype.findPhoneNumber = function(query) {
      query = query.replace(/\s/g, '');
      return this.onVendorsFound(this._findBy('phone', query));
    };

    VendorFindMode.prototype.findEmail = function(query) {
      return this.onVendorsFound(this._findBy('email', query));
    };

    VendorFindMode.prototype.findName = function(query) {
      return this.onVendorsFound(this._findBy('name', query));
    };

    VendorFindMode.prototype._findBy = function(property, query) {
      if (this._dummy[property].indexOf(query) >= 0) {
        return [this._dummy];
      } else {
        return [];
      }
    };

    VendorFindMode.prototype.onVendorsFound = function(vendors) {
      var index, vendor, _i, _len, _results;
      this.clearReceipt();
      _results = [];
      for (index = _i = 0, _len = vendors.length; _i < _len; index = ++_i) {
        vendor = vendors[index];
        _results.push(this.cfg.uiRef.receiptResult.append(this.createRow(index + 1, vendor.id, vendor.name, vendor.email, vendor.phone)));
      }
      return _results;
    };

    VendorFindMode.prototype.createRow = function() {
      var a, args, row;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      row = $("<tr>");
      return row.append.apply(row, (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          a = args[_i];
          _results.push($("<td>").text(a));
        }
        return _results;
      })());
    };

    return VendorFindMode;

  })(CheckoutMode);

}).call(this);