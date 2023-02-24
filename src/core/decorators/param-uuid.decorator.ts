import { Param, ParseUUIDPipe } from "@nestjs/common"

export function ParamUUID(): ParameterDecorator {
  return Param("id", ParseUUIDPipe)
}
