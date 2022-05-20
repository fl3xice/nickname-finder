import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
const fs = require('fs');

export interface DataNickname {
  nameService: string;
  link: string;
}

@Injectable()
export class SnoopService {
  private queue: Map<string, boolean> = new Map();
  private dataRegex = /(https?:\/\/.+)\s\|\s(.+)\n/g;

  constructor() {
    setInterval(() => {
      this.queue.forEach((value, key) => {
        if (value) {
          this.queue.delete(key);
        }
      });
    }, 172800000);
    // 172 800 000 - Equals to 2 days
  }

  async search(
    nickname: string,
    again: boolean,
  ): Promise<{ status: string; message: string }> {
    if (again) {
      if (fs.existsSync('snoop/results/nicknames/txt/' + nickname + '.txt')) {
        fs.unlink('snoop/results/nicknames/txt/' + nickname + '.txt', (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }

    this.queue.set(nickname, false);

    exec('cd snoop; python3 snoop.py ' + nickname, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        this.queue.delete(nickname);
        return;
      }

      this.queue.set(nickname, true);
    });

    return { status: 'await', message: 'use /snoop/check/' + nickname };
  }

  async checkStatus(
    nickname: string,
  ): Promise<{ status: boolean; message: string }> {
    if (this.queue.has(nickname) && this.queue.get(nickname)) {
      return {
        status: true,
        message: 'Nickname is available' + ' use /snoop/get/' + nickname,
      };
    }

    if (fs.existsSync('snoop/results/nicknames/txt/' + nickname + '.txt')) {
      return {
        status: true,
        message: 'Nickname is available' + ' use /snoop/get/' + nickname,
      };
    }

    return { status: false, message: 'Nickname is not available' };
  }

  async getData(
    nickname: string,
  ): Promise<{ status: boolean; data: DataNickname[] }> {
    const data = await this._parseData(nickname);
    return { status: false, data };
  }

  private async _parseData(nickname: string): Promise<DataNickname[]> {
    const statusNickname = await this.checkStatus(nickname);
    if (statusNickname.status) {
      const array: DataNickname[] = [];
      const dataFull: string = fs
        .readFileSync('snoop/results/nicknames/txt/' + nickname + '.txt')
        .toString();
      const data = dataFull.matchAll(this.dataRegex);
      for (const dataItem of data) {
        array.push({ nameService: dataItem[2], link: dataItem[1] });
      }
      return array;
    }
    return [];
  }
}
