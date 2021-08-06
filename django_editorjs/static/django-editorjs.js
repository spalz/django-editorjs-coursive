(function () {
  /**
   * @param {Object} config
   * @param {String} tool
   * @param {Object} default_config
   */
  function extractToolConfig(config, tool, default_config) {
    var result = Object.assign({}, default_config);
    if (config && config.tools && config.tools[tool]) {
      if (config.tools[tool].disabled) {
        return undefined;
      }
      Object.assign(result, config.tools[tool]);
    }
    return result;
  }

  /**
   * @param {Object} config
   * @param {String} tool
   */
  function isDisabled(config, tool) {
    return !!(
      config &&
      config.tools &&
      config.tools[tool] &&
      config.tools[tool].disabled
    );
  }

  /**
   * @param {HTMLDivElement} field_wrapper
   */
  function initEditorJsField(field_wrapper) {
    var holder_el = field_wrapper.querySelector("[data-editorjs-holder]");
    var input_el = field_wrapper.querySelector("[data-editorjs-input]");
    var config_el = field_wrapper.querySelector("[data-editorjs-config]");
    var config = JSON.parse(config_el.innerHTML.trim());
    var tools = {};
    if (!isDisabled(config, "Image")) {
      tools.Image = extractToolConfig(config, "Image", {
        class: ImageTool,
        inlineToolbar: true,
      });
    }
    if (!isDisabled(config, "Header")) {
      tools.Header = extractToolConfig(config, "Header", {
        class: Header,
        config: {
          inlineToolbar: [
            "bold",
            "italic",
            "hyperlink",
            "marker",
            "inlineCode",
          ],
          levels: [2, 3, 4],
          defaultLevel: 2,
        },
      });
    }
    if (!isDisabled(config, "List")) {
      tools.List = extractToolConfig(config, "List", {
        class: List,
        inlineToolbar: true,
      });
    }
    if (!isDisabled(config, "Quote")) {
      tools.Quote = extractToolConfig(config, "Quote", {
        class: Quote,
        inlineToolbar: true,
      });
    }
    if (!isDisabled(config, "Embed")) {
      tools.Embed = extractToolConfig(config, "Embed", {
        class: Embed,
        inlineToolbar: true,
      });
    }
    if (!isDisabled(config, "Marker")) {
      tools.Marker = extractToolConfig(config, "Marker", {
        class: Marker,
      });
    }
    if (!isDisabled(config, "Attaches")) {
      tools.Attaches = extractToolConfig(config, "Attaches", {
        class: AttachesTool,
      });
    }
    if (!isDisabled(config, "Hyperlink")) {
      tools.Hyperlink = extractToolConfig(config, "Hyperlink", {
        class: Hyperlink,
        inlineToolbar: false,
        config: {
          shortcut: "CMD+L",
          target: "_blank",
          rel: "nofollow",
          availableTargets: ["_blank", "_self"],
          availableRels: ["author", "noreferrer"],
          validate: false,
        },
      });
    }
    if (!isDisabled(config, "AlertCursive")) {
      tools.AlertCursive = extractToolConfig(config, "AlertCursive", {
        class: AlertCursive,
      });
    }
    if (!isDisabled(config, "AlertCursiveAchievement")) {
      tools.AlertCursiveAchievement = extractToolConfig(
        config,
        "AlertCursiveAchievement",
        {
          class: AlertCursiveAchievement,
        }
      );
    }
    if (!isDisabled(config, "AttachesAudio")) {
      tools.AttachesAudio = extractToolConfig(config, "AttachesAudio", {
        class: AttachesAudio,
      });
    }
    if (!isDisabled(config, "Carousel")) {
      tools.Carousel = extractToolConfig(config, "Carousel", {
        class: Carousel,
        config: {
          buttonContent: "123123123123123",
          captionPlaceholder: "123123123123123",
        },
      });
    }
    if (!isDisabled(config, "Comparison")) {
      tools.Comparison = extractToolConfig(config, "Comparison", {
        class: Comparison,
      });
    }
    if (!isDisabled(config, "ComponentSelectorTool")) {
      tools.ComponentSelectorTool = extractToolConfig(
        config,
        "ComponentSelectorTool",
        {
          class: ComponentSelectorTool,
          config: {
            components: [
              {
                name: "dialog_one",
                alias: "Жуть, как так можно было сделать",
              },
              {
                name: "dialog_two",
                alias: "Как начать общение?",
              },
            ],
          },
        }
      );
    }

    const editor = new EditorJS({
      holder: holder_el,
      tools: tools,
      data:
        (input_el.value &&
          input_el.value.trim() &&
          JSON.parse(input_el.value.trim())) ||
        undefined,
      onChange: function () {
        editor
          .save()
          .then(function (outputData) {
            console.log(JSON.stringify(outputData));
            input_el.value = JSON.stringify(outputData);
          })
          .catch(function (error) {
            console.log("Saving failed: ", error);
          });
      },
    });
  }

  window.addEventListener("load", function () {
    var editor_wrappers = document.querySelectorAll("[data-editorjs-wrapper]");
    editor_wrappers.forEach(initEditorJsField);
  });
})();
