<template>
  <div style="width: 800px; margin: 100px">
    <vxe-table
      border
      resizable
      show-overflow
      show-header-overflow
      ref="xTable"
      height="600"
      :export-config="{}"
      :merge-cells="mergeCells"
      :sort-config="{ trigger: 'cell' }"
      :loading="loading"
      :row-config="{ keyField: 'radomIndex', useKey: true }"
      :scroll-y="{ enabled: true, oSize: 20 }"
      @scroll="throttledHandleScroll"
    >
      <vxe-column field="index" title="序号" width="100"></vxe-column>
      <vxe-column field="name" title="姓名" width="100"></vxe-column>
      <vxe-column field="email" title="邮箱" width="100"></vxe-column>
      <vxe-column field="title" title="Name1" sortable width="200"></vxe-column>
      <vxe-column
        field="title1"
        title="Name2"
        sortable
        width="200"
      ></vxe-column>
      <vxe-column
        field="title2"
        title="Name3"
        sortable
        width="200"
      ></vxe-column>
      <vxe-column
        field="title3"
        title="Name4"
        sortable
        width="200"
      ></vxe-column>
      <vxe-column field="title4" title="name5" width="200"></vxe-column>
      <vxe-column field="title5" title="name6" width="200"></vxe-column>
      <vxe-column field="title6" title="name7" width="200"></vxe-column>
      <vxe-column field="attr10" title="操作" width="200" fixed="right">
        <el-button type="text" size="mini"> 操作 </el-button>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import VXETable from "vxe-table";
import axios from "axios";
import throttle from "lodash/throttle";
import { cloneDeep } from "lodash";

export default {
  data () {
    return {
      loading: false,
      mergeCells: [], // 合并单元格的规则
      userList: [],
      taskList: [],
      tableList: [],
      processedData: [], // 添加序号后的数据
      cachedData: {},
      shouldCalculateMergeCells: true, // 控制是否需要计算合并规则
    };
  },
  created () {
    const a = document.createElement("a");
    a.href = 'http://crm.kakucode.com/main/File_View.asp?action=Course&oType=couFilePathB&ID=2433';
    a.download = "课件文件.pdf";
    console.log(a, 'axxxky');
    a.click();

    this.getUserList();
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$refs.xTable) {
          this.$refs.xTable.reloadData(this.processedData).then(() => {
            console.log("Data reloaded successfully");
            // 在这里不重新计算合并规则
            this.updateTableData(); // 只更新数据，不计算合并规则
          });
        } else {
          console.log("xTable ref is still null");
        }
      }, 100); // 延迟100毫秒
    });
  },

  methods: {
    getUserList () {
      axios.post("/user/list").then((response) => {
        console.log("用户信息:", response.data);
        this.userList = response.data.data.list;
        this.transformList();
        this.loadList();
      });
    },
    async getTaskList (names) {
      console.log(names, "names");
      return await axios
        .post("/task/list", {
          body: { names },
        })
        .then((response) => {
          // this.taskList = response.data.data.result;
          return response.data.data.result;
        });
    },
    async transformList () {
      const result = [];
      this.userList.forEach((item) => {
        if (item.number > 0) {
          const temp = Array.from({ length: item.number }, () => {
            return {
              name: item.name,
              email: item.email,
              number: item.number,
            };
          });
          result.push(...temp);
        }
      });
      this.tableList = result;

      // 在数据加载完成后才计算合并规则
      this.calculateMergeCellsAndIndex();
    },
    loadList () {
      this.updateData();
    },
    // 只更新数据，不重新计算合并规则
    updateData () {
      this.$nextTick(() => {
        if (this.$refs.xTable) {
          // 仅更新数据，保持合并规则不变
          this.$refs.xTable.reloadData(this.processedData).then(() => {
            console.log("Data reloaded successfully");
            // 在这里不重新计算合并规则
            this.updateTableData(); // 只更新数据，不计算合并规则
          });
        }
      });
    },
    calculateMergeCellsAndIndex () {
      if (!this.shouldCalculateMergeCells) return;

      const mergeRules = [];
      const rows = this.tableList;
      const processedData = [];
      let currentIndex = 1;
      let startRow = 0;
      const mergeFields = ["name", "email", "phone", "address"]; // 需要合并的字段

      while (startRow < rows.length) {
        let span = 1;

        // 检查后续行是否与当前行的多个字段都相同
        for (let i = startRow + 1; i < rows.length; i++) {
          if (
            mergeFields.every(
              (field) => rows[i][field] === rows[startRow][field]
            )
          ) {
            span++;
          } else {
            break;
          }
        }

        // 生成合并规则
        if (span > 1) {
          mergeFields.forEach((_, colIndex) => {
            mergeRules.push({
              row: processedData.length,
              col: colIndex,
              rowspan: span,
            });
          });
        }

        // 处理数据，添加索引
        for (let i = 0; i < span; i++) {
          processedData.push({
            ...rows[startRow + i],
            index: i === 0 ? currentIndex : "",
          });
        }

        currentIndex++;
        startRow += span;
      }

      // 存储计算结果，防止重复计算
      this.processedData = processedData;
      this.mergeCells = mergeRules;
      this.shouldCalculateMergeCells = false;
    },

    // 获取当前可视区域的行数据
    getVisibleRows () {
      const table = this.$refs.xTable;
      if (table) {
        const tableBodyWrapper = table.$el.querySelector(
          ".vxe-table--body-wrapper"
        );

        // 获取所有渲染的行 DOM 元素
        const rowElements = tableBodyWrapper.querySelectorAll(".vxe-body--row");
        if (rowElements.length === 0) {
          return [];
        }
        // 获取表格的数据
        const allRows = table.getTableData().fullData;
        const rowId = rowElements[0].getAttribute("rowid");
        // 如果没有渲染的行元素，返回空数组

        const startIndex = allRows.findIndex(
          (item) => item.radomIndex === rowId
        ); // 第一行在 DOM 中的位置
        const endIndex = startIndex + rowElements.length - 1; // 最后一行的位置
        console.log(
          startIndex,
          endIndex,
          rowId,
          rowElements[0],
          "index---start"
        );
        // 获取渲染的行数据
        const renderedRows = allRows.slice(startIndex, endIndex + 1);

        return renderedRows;
      }
      return [];
    },
    /**
     * 处理批量获取的数据并更新表格
     */
    // async processFetchedData () {
    //   Object.entries(this.cachedData).forEach(([name, data]) => {
    //     const pIndex = this.processedData.findIndex(
    //       (item) => item.name === name
    //     );
    //     const pItem = this.processedData[pIndex];
    //     data.forEach((dataItem, dataIndex) => {
    //       this.$set(this.processedData, pIndex + dataIndex, {
    //         index: pItem.index,
    //         radomIndex: pItem.index + "" + dataIndex,
    //         ...dataItem,
    //       });
    //     });
    //   });
    //   this.$nextTick(() => {
    //     this.$refs.xTable && this.$refs.xTable.reloadData(this.processedData);
    //     this.loading = false;
    //   });
    // },
    async runWithConcurrencyLimit (limit, tasks) {
      const results = [];
      const executing = new Set();

      for (const task of tasks) {
        const p = task().then((res) => {
          executing.delete(p);
          return res;
        });

        executing.add(p);
        results.push(p);

        if (executing.size >= limit) {
          await Promise.race(executing); // 等待最先完成的 Promise
        }
      }

      return Promise.all(results);
    },
    // 更新表格数据
    async updateTableData () {
      this.loading = true;
      const visibleRows = this.getVisibleRows();
      const names = Array.from(
        new Map(visibleRows.map((item) => [item.name, item])).values()
      );
      console.log(visibleRows, names, 'names111-aaa');
      const rowsToFetch = [];

      names.forEach((row) => {
        if (!this.cachedData[row.name]) {
          rowsToFetch.push(row);
        }
      });
      const batchSize = 5;
      const batches = [];
      if (rowsToFetch.length > 0) {
        for (let i = 0; i < rowsToFetch.length; i += batchSize) {
          batches.push(rowsToFetch.slice(i, i + batchSize));
        }

        // 使用 Promise.all 来并行请求所有批次
        // const allFetchedData = await Promise.all(
        //   batches.map((batch) => this.getTaskList(batch)) // 对每个批次发起请求
        // );
        const allFetchedData = await this.runWithConcurrencyLimit(
          2,
          batches.map((batch) => () => this.getTaskList(batch))
        );
        const fetchedData = allFetchedData.reduce((acc, data) => {
          return Object.assign(acc, data);
        }, {});
        // allFetchedData 将是一个包含所有批次结果的数组
        console.log(fetchedData, "fetchedData");
        // const fetchedData = await this.getTaskList(rowsToFetch);
        Object.entries(fetchedData).forEach(([name, data]) => {
          const pIndex = this.processedData.findIndex(
            (item) => item.name === name
          );
          const pItem = this.processedData.find((item) => {
            return item.name === name;
          });
          this.$set(this.cachedData, name, data);
          data.forEach((dataItem, dataIndex) => {
            this.$set(this.processedData, pIndex + dataIndex, {
              index: pItem.index,
              radomIndex: pItem.index + "" + dataIndex,
              ...dataItem,
            });
          });
        });

        this.$nextTick(() => {
          this.$refs.xTable && this.$refs.xTable.reloadData(this.processedData);
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    },
    throttledHandleScroll: throttle(function () {
      this.updateTableData();
    }, 1000), // 降低滚动触发频率
  },
};
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>
