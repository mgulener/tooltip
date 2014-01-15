Tooltip
=======

Tooltip data from a static text / an element (id) / a function return / ajax get from url

<h1>Usage</h1>
  <p>The tooltip plugin generates content and markup on demand, and by default places tooltips after their trigger element. <br>
    <br>
    Trigger the tooltip via JavaScript:</p>
  <pre><code>$('#example').tooltip(options)</code></pre>
  <h1>Markup</h1>
  <p>The generated markup of a tooltip is rather simple, though it does require a position (by default, set to <strong>top</strong> by the plugin).</p>
  <pre><code>&lt;div class="tooltip"&gt;
 &lt;div class="tooltip-inner"&gt;Tooltip!&lt;/div&gt;
 &lt;div class="tooltip-arrow"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
  <h1>Options</h1>
  <p>Options can be passed via data attributes or JavaScript. For data attributes, append the option name to <strong>data-</strong>, as in <strong>data-animation=""</strong>.</p>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th style="width: 100px;">Name</th>
        <th style="width: 100px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>html</td>
        <td>boolean</td>
        <td>false</td>
        <td>Insert HTML into the tooltip. If false, jQuery's text method will be used to insert content into the DOM. Use text if you're worried about XSS attacks.</td>
      </tr>
      <tr>
        <td>placement</td>
        <td>string | function</td>
        <td>'top'</td>
        <td>how to position the tooltip - top | bottom | left | right | auto. <br>
          When "auto" is specified, it will dynamically reorient the tooltip. For example, if placement is "auto left", the tooltip will display to the left when possible, otherwise it will display right.</td>
      </tr>
      <tr>
        <td>title</td>
        <td>string | function</td>
        <td>''</td>
        <td>default title value if title attribute isn't present</td>
      </tr>
      <tr>
        <td>trigger</td>
        <td>string</td>
        <td>'hover focus'</td>
        <td>how tooltip is triggered - click | hover | focus | manual. You may pass multiple triggers; separate them with a space.</td>
      </tr>
      <tr>
        <td>delay</td>
        <td>number | object</td>
        <td>0</td>
        <td><p>delay showing and hiding the tooltip (ms) - does not apply to manual trigger type</p>
          <p>If a number is supplied, delay is applied to both hide/show</p>
          <p>Object structure is: <code>delay: { show: 500, hide: 100 }</code></p></td>
      </tr>
      <tr>
        <td>dataType</td>
        <td>string</td>
        <td>'text'</td>
        <td>how to data type the tooltip - text | id | function | url<br>
          <strong>text :</strong> Static text<br>
          <code>title=&quot;Static text&quot;</code> <strong>id :</strong> an element  id attribute<br>
          <code>title=&quot;#elementId&quot; data-tooltip-type=&quot;id&quot;</code> <strong>function :</strong> a javascript function into the page <code>title=&quot;funcName(x,y)&quot; data-tooltip-type=&quot;function&quot;</code><br>
          <strong>url :</strong> get data with ajax from url <code>title=&quot;data.html&quot; data-tooltip-type=&quot;url&quot;</code></td>
      </tr>
    </tbody>
  </table>
