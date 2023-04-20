<template>
  <div>
    <!-- :toolbar-attributes="{ color: 'yellow' }"
    min-height="500"
    max-height="600"
    :editor-properties="editorProperties"
    output-format="json"
   -->
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
      blanditiis quis. Modi dolores nam corporis. Necessitatibus facere quae,
      illo distinctio earum, iure nihil tempore odit sunt ipsa et atque cumque.
    </div>
    <br />
    <br />
    <br />
    <tiptap-vuetify
      id="some-id"
      v-model="content"
      :extensions="extensions"
      placeholder="Write something …"
      @keydown="onkeydown"
    />

    <br /><br />
    <h1>Preview</h1>
    <hr />

    <div class="tiptap-vuetify-editor__content" v-html="content" />
  </div>
</template>

<script>
import { MAIN_MODULE } from "../config";
import MyCustomExtension from "../MyCustomExtension";
import FileSelector from "../Components/FileSelector";

export default {
  components: {
    TiptapVuetify: () => MAIN_MODULE.then(({ TiptapVuetify }) => TiptapVuetify)
  },
  data: () => ({
    // editorProperties: {
    //   editorProps: {
    //     handleKeyDown (a, b, c) {
    //       console.log('handleKeyDown', a, b, c)
    //     }
    //   }
    // },
    extensions: null,
    content: `
      <h1>Yay Headlines!</h1>
      <blockquote>Test quote.</blockquote>
      <p>All these <strong>cool tags</strong> are working now.</p>
      <p>
        There is always something to do. Thankfully, there are checklists for that. Don't forget to call mom.
      </p>
      <ul data-type="todo_list">
        <li data-type="todo_item" data-done="true">
          Buy beer
        </li>
        <li data-type="todo_item" data-done="true">
          Buy meat
        </li>
        <li data-type="todo_item" data-done="true">
          Buy milk
        </li>
        <li data-type="todo_item" data-done="false">
          Call mom
        </li>
      </ul>
      <table>
        <tr>
          <th colspan="3" data-colwidth="100,0,0">Wide header</th>
        </tr>
        <tr>
          <td>One</td>
          <td>Two</td>
          <td>Three</td>
        </tr>
        <tr>
          <td>Four</td>
          <td>Five</td>
          <td>Six</td>
        </tr>
      </table>
    `
  }),
  async created() {
    const {
      Heading,
      Bold,
      Italic,
      Strike,
      Underline,
      Code,
      CodeBlock,
      Paragraph,
      BulletList,
      OrderedList,
      ListItem,
      Link,
      Blockquote,
      HardBreak,
      HorizontalRule,
      History,
      Image,
      TodoList,
      TodoItem,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Snippets
    } = await MAIN_MODULE;

    this.extensions = [
      MyCustomExtension,
      [
        Snippets,
        {
          options: {
            list: [
              {
                title: "Generate ideas",
                content: "lorem ipsum dolor sit amet",
                onClick: this.appendContent
              }
            ],
            tooltip: "Paste some snippets",
            iconSrc: require("~/assets/ai-blue.jpg")
          }
        }
      ],
      [
        Table,
        {
          options: {
            resizable: true
          }
        }
      ],
      TableCell,
      TableHeader,
      TodoList,
      TableRow,
      [
        TodoItem,
        {
          options: {
            nested: true
          }
        }
      ],
      Code,
      CodeBlock,
      HorizontalRule,
      Paragraph,
      History,
      HardBreak, // позволяет переносить через Shift + Ctrl + Enter
      Underline,
      Strike,
      Italic,
      ListItem, // если нужно использовать список (BulletList, OrderedList)
      BulletList,
      OrderedList,
      [
        Image,
        {
          options: {
            imageSources: [{ component: FileSelector, name: "File Selector" }]
          }
        }
      ],
      [
        Heading,
        {
          // Опции которые попадают в расширение tiptap
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      // но опции не обязательно указывать если нужно чтобы renderIn: 'toolbar', это по умолчанию.
      [
        Bold,
        {
          renderIn: "toolbar"
        }
      ],
      [
        Blockquote,
        {
          renderIn: "bubbleMenu",
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      [
        Link,
        {
          renderIn: "bubbleMenu"
        }
      ]
    ];
  },
  methods: {
    onkeydown(event) {
      // console.log('event', event.key)
    },
    appendContent({ editor }) {
      const words = "1. apple\n2. orange\n3. grape".split(" ");
      words.forEach((word, index) => {
        if (word.includes("\n")) {
          word = word.replace("\n", "<br>");
        }
        const firstWord = index === 0;
        let content = editor.getHTML();
        if (!firstWord) {
          // without this new p tag will be created each time we insert,
          // but we only need it once
          content = content.substring(0, content.length - 4);
        }

        editor.setContent(content + (firstWord ? "" : " ") + word);
      });

      // the ID
      const editorEl = editor.view.dom;
      const ID = editorEl.closest(".tiptap-vuetify-editor").getAttribute("id");
      console.log("ID", ID);
    }
  }
};
</script>
