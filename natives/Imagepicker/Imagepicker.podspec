require "json"

package = JSON.parse(File.read(File.join(__dir__, "../../package.json")))

Pod::Spec.new do |s|
  s.name         = "Imagepicker"
  s.version      = package["version"]
  s.summary      = "Native Modules Imagepicker"

  s.author       = "xx"

  s.homepage     = "xx"

  s.license      = "MIT"
  s.platform     = :ios, "9.0"

  s.source       = { :git => "xx" }

  s.source_files = "ios/*.{h,m}"
  s.public_header_files  = 'ios/*.h'
  s.dependency "React"
end
