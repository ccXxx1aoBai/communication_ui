<template>
  <div class="container">
    <div class="row">
      <div class="title">系统基本信息</div>
      <div class="content">
        <div class="panel">
          <div class="data-row">
            <div class="data-label">操作系统：</div>
            <div class="data-value">
              {{ system.osName }}
            </div>
          </div>
          <div class="data-row">
            <div class="data-label">系统架构：</div>
            <div class="data-value">
              {{ system.osArch }}
            </div>
          </div>
          <div class="data-row">
            <div class="data-label">运行环境：</div>
            <div class="data-value">
              {{ system.environment }}
            </div>
          </div>
          <div class="data-row" v-for="(c, index) in cpu" :key="index">
            <div class="data-label">
              {{ c.name }}
            </div>
            <div class="data-value">
              {{ c.value }}
            </div>
          </div>
          <div class="data-row">
            <div class="data-label">内存大小：</div>
            <div class="data-value">
              {{ memory.total }}
            </div>
          </div>
          <div class="data-row">
            <div class="data-label">已使用：</div>
            <div class="data-value">
              {{ memory.used }}
            </div>
          </div>
        </div>
        <div class="panel">
          <div
            class="data-row"
            style="display: block"
            v-for="(d, index) in disk"
            :key="index"
          >
            <div class="data-row">
              <div class="data-label">磁盘名称：</div>
              <div class="data-value">
                {{ d.name }}
              </div>
            </div>
            <div class="data-row">
              <div class="data-label">总容量：</div>
              <div
                class="data-value cursor"
                :class="opened == index ? 'open' : ''"
                @click="opened == index ? (opened = -1) : (opened = index)"
              >
                <span>{{ d.size }}</span>
                <el-icon>
                  <ArrowDown />
                </el-icon>
              </div>
            </div>
            <div class="disk" :class="opened == index ? 'open' : ''">
              <div class="data-row" v-for="(x, i) in d.hpList" :key="i">
                <div class="disk-detail">
                  <div class="disk-name">
                    {{ x.osList[0].name }}
                  </div>
                  <div
                    class="disk-progress"
                    :style="{
                      background: `linear-gradient(to right, #26a0da ${(
                        (x.osList[0].lUsed / x.osList[0].lTotal) *
                        100
                      ).toFixed(2)}%, #f1f1f1 ${(
                        (x.osList[0].lUsed / x.osList[0].lTotal) *
                        100
                      ).toFixed(2)}%)`,
                    }"
                  ></div>
                  <div class="disk-info">
                    {{ x.osList[0].free }}可用， 共{{ x.osList[0].total }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="title">运行环境信息</div>
      <div class="data-row">
        <div class="data-label">JDK版本：</div>
        <div class="data-value">
          {{ jvm.jdkVersion }}
        </div>
      </div>
      <div class="data-row">
        <div class="data-label">JDK路径：</div>
        <div class="data-value">
          {{ jvm.jdkPath }}
        </div>
      </div>
      <div class="data-row">
        <div class="data-label">JVM内存：</div>
        <div class="data-value">已使用{{ jvm.used }}，总{{ jvm.total }}</div>
      </div>
      <div class="data-row">
        <div class="data-label">JVM启动时间：</div>
        <div class="data-value">
          {{ jvm.startTime }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="title">运行环境信息</div>
      <div class="flex">
        <div class="data-col">
          <div class="data-row">
            <div class="data-label">数据库类型：</div>
            <div class="data-value">
              {{ database.dataName }}
            </div>
          </div>
          <div class="data-row">
            <div class="data-label">数据库版本：</div>
            <div class="data-value">
              {{ database.dataVersion }}
            </div>
          </div>
          <div class="data-row">
            <div class="data-label">JDBC版本：</div>
            <div class="data-value">
              {{ database.jdbcVersion }}
            </div>
          </div>
        </div>
        <div class="data-col" style="margin-left: 150px;">
          <div class="data-row">
            <div class="data-label">Redis架构：</div>
            <div class="data-value">
              {{ database.arch }}
            </div>
          </div>
          <div class="data-row">
            <div class="data-label">Redis端口：</div>
            <div class="data-value">
              {{ database.port }}
            </div>
          </div>
          <div class="data-row">
            <div class="data-label">Redis版本</div>
            <div class="data-value">
              {{ database.version }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getSystemInfo } from '@/api/common';

const opened = ref<Number>(-1);
const cpu = ref<any>([]);
const memory = ref<any>({});
const jvm = ref<any>({});
const disk = ref<any>([]);
const system = ref<any>({});
const database = ref<any>({});
getSystemInfo().then((res: Res) => {
  const { code, data } = res;
  if (code === 200) {
    Object.keys(data.cpu).forEach((key: any) => {
      cpu.value.push({ name: key, value: data.cpu[key] });
    });
    memory.value = data.memory;
    jvm.value = data.jvm;
    disk.value = data.disk;
    system.value = data.system;
    database.value = data.database;
  }
});
</script>

<style scoped lang="scss">
.row {
  background-color: #ffffff;
  padding: 14px;
  margin-bottom: 20px;
  border-radius: 16px;
}
.content {
  display: flex;
  align-items: flex-start;
}
.panel {
  margin: 0 10px;
}
.title {
  margin-bottom: 14px;
  font-size: 18px;
  font-weight: bold;
}
.data-row {
  display: flex;
  align-items: center;
  padding: 6px 0;
  margin-left: 2em;

  .data-label {
    min-width: 70px;
    white-space: nowrap;
    text-align: justify;
  }

  .data-value {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &.cursor {
      cursor: pointer;
    }

    .el-icon {
      transition: all 0.3s;
    }

    &.open {
      .el-icon {
        transform: rotate(180deg);
      }
    }

    span {
      margin-right: 6px;
    }
  }

  .disk {
    display: flex;
    align-items: center;
    height: 0;
    transition: all 0.3s;
    overflow: hidden;

    &.open {
      height: 80px;
    }

    .disk-progress {
      margin: 6px 0;
    }
  }
}
.disk-progress {
  width: 100%;
  height: 14px;
}

.flex {
  display: flex;
  align-items: center;
}
</style>
