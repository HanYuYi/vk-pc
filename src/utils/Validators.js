import { Message } from "element-ui"

/**
 * 验证器
 */
export class RulesValidator {
  /**
   * @param rulesList Array<{
   *   validator: 基础类型 | function
   *   type?: string
   *   message?: string
   *   duration?: number
   * }>
   */
  constructor (rulesList) {
    this.rulesList = rulesList
    this.status = true
    this.validationRules()
  }

  validationRules () {
    let validationResults = true

    for (const item of this.rulesList) {
      validationResults = typeof item.validator === "function" ? item.validator() : item.validator

      // 验证成立则被拦截
      if (validationResults) {
        this.status = false
        if (item.message) {
          Message({
            type: item.type || "warning",
            message: item.message,
            duration: item.duration || 2000
          })
        }
        break
      }
    }
  }
}

