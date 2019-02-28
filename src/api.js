let api = null;

const init =
  process.env.NODE_ENV === "development"
    ? callback => {
        const stubApi = {
          window: {
            startAutoResizer: () => {
              console.log("api:startAutoResizer");
            }
          },
          field: {
            getValue: () => {
              return "A value";
            },
            setValue: value => {
              console.log("api:setValue", value);
              return Promise.resolve();
            }
          }
        };
        api = stubApi;
        callback(stubApi);
      }
    : callback => {
        var cfExt = window.contentfulExtension || window.contentfulWidget;
        console.log('initing contenful extensions');
        cfExt.init(function(_api) {
          console.log('did init contentful extensions', _api);
          api = _api;
          callback(_api);
        });
      };

export function initApi(callback) {
  init(callback);
}
