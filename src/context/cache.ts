/*
 * Tencent is pleased to support the open source community by making
 * 蓝鲸智云PaaS平台 (BlueKing PaaS) available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 蓝鲸智云PaaS平台 (BlueKing PaaS) is licensed under the MIT License.
 *
 * License for 蓝鲸智云PaaS平台 (BlueKing PaaS):
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
import { BaseModel } from '../typings';

let currentRunningApp: BaseModel | null = null;
export function getCurrentRunningApp() {
  return currentRunningApp;
}
export function setCurrentRunningApp(appInstance: BaseModel | null) {
  currentRunningApp = appInstance;
}

export const SCOPED_CSS_STYLE_ID = 'SCOPED_CSS_STYLE_ID';

const templateStyle: HTMLStyleElement = document.createElement('style');
templateStyle.setAttribute('id', SCOPED_CSS_STYLE_ID);
document.body.appendChild(templateStyle);
templateStyle.sheet!.disabled = true;
export const disabledStyleDom = templateStyle;
export const windowNativeFuncMap = new Map<PropertyKey, true>();
/**
 * 收集原生window方法
 */
const collectNativeWindowFunc = () => {
  Object.getOwnPropertyNames(window).forEach((key: any) => {
    if (
      !windowNativeFuncMap.has(key) &&
      key.match(/^[A-Z]/) &&
      typeof window[key] === 'function' &&
      window[key].toString().includes('[native code]')
    ) {
      windowNativeFuncMap.set(key, true);
    }
  });
};
collectNativeWindowFunc();
