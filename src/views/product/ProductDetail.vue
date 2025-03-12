<template>
  <div>
    <div ref="s2Container" style="width: 100%; height: 600px"></div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  TableSheet,
  EXTRA_FIELD,
  S2Event,
} from "@antv/s2";

export default Vue.extend({
  data () {
    return {
      s2Container: null,
      s2: null, // 存储 S2 实例
    };
  },
  mounted () {
    this.s2Container = this.$refs.s2Container;
    this.initializeS2();
  },
  methods: {
    // 生成数据的方法
    generateData (count) {
      const data = [];
      for (let i = 1; i <= count; i++) {
        data.push({
          id: i,
          name: i % 2 === 0 ? "Alice" : "Bob",
          age: 20 + (i % 30),
          gender: i % 2 === 0 ? "Female" : "Male",
          address: i % 2 === 0 ? "New York" : "Los Angeles",
          phone: `+1 555-01${i % 10}`,
          email: `user${i}@example.com`,
          company: i % 2 === 0 ? "Google" : "Microsoft",
          job: i % 2 === 0 ? "Engineer" : "Manager",
          salary: `$${50000 + (i % 10000)}`,
          status: i % 2 === 0 ? "Active" : "Inactive",
          joinDate: `202${i % 4}-0${(i % 9) + 1}-15`,
          lastLogin: `202${(i % 3) + 1}-0${(i % 9) + 1}-10 14:30`,
          description: `用户 ${i} 的简介，包含很多信息，鼠标悬停时显示完整内容。`,
          action: "详情",
        });
      }
      return data;
    },

    initializeS2 () {
      const dataCfg = {
        fields: {
          columns: [
            "name",
            "age",
            "gender",
            "address",
            "phone",
            "email",
            "company",
            "job",
            "salary",
            "status",
            "joinDate",
            "lastLogin",
            "description",
            "action",
          ],
        },
        data: this.generateData(1000), // 生成 1000 条数据
      };

      const options = {
        width: 1200,
        height: 600,
        style: {
          colCfg: {
            widthByField: {
              name: 120,
              age: 80,
              gender: 100,
              address: 150,
              phone: 120,
              email: 200,
              company: 150,
              job: 120,
              salary: 100,
              status: 100,
              joinDate: 120,
              lastLogin: 180,
              description: 250,
              action: 100,
            },
          },
        },
        frozen: {
          // 列尾冻结数量
          // trailingColCount: 1,
        },
        // interaction: {
        //   linkFields: ["action", "type", "number", EXTRA_FIELD],
        // },
      };

      this.s2 = new TableSheet(this.s2Container, dataCfg, options);
      console.log(this.s2, "s2");

      // this.s2.on(S2Event.GLOBAL_LINK_FIELD_JUMP, (jumpData) => {
      //   console.log("jumpData:", jumpData);
      //   const { field, record } = jumpData;
      //   const index = record?.rowIndex;
      //   console.log(dataCfg.data[index], 'test');
      // });

      // **鼠标悬停长文本时显示 Tooltip**
      // this.s2.on(S2Event.DATA_CELL_HOVER, (event) => {
      //   console.log(event, 'event');
      //   const { data, event: mouseEvent } = event;
      //   if (data?.field !== "action" && data?.value?.length > 10) {
      //     const tooltip = document.createElement("div");
      //     tooltip.innerText = data.value;
      //     tooltip.style.position = "fixed";
      //     tooltip.style.top = `${mouseEvent.clientY + 10}px`;
      //     tooltip.style.left = `${mouseEvent.clientX + 10}px`;
      //     tooltip.style.background = "#000";
      //     tooltip.style.color = "#fff";
      //     tooltip.style.padding = "5px 10px";
      //     tooltip.style.borderRadius = "4px";
      //     tooltip.style.zIndex = "1000";
      //     tooltip.style.whiteSpace = "nowrap";
      //     tooltip.setAttribute("id", "s2-tooltip");
      //     document.body.appendChild(tooltip);
      //   }
      // });

      // **鼠标移出隐藏 Tooltip**
      // this.s2.on("data-cell-mouseleave", () => {
      //   const tooltip = document.getElementById("s2-tooltip");
      //   if (tooltip) tooltip.remove();
      // });

      this.s2.render();
    },
  },
});
</script>
