const fs = require('fs');

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove `const [errors, setErrors] = useState<FormErrors>({});`
  content = content.replace(/const \[errors, setErrors\] = useState<FormErrors>\(\{\}\);\n?/g, '');
  
  // Remove `interface FormErrors { ... }`
  content = content.replace(/interface FormErrors {[\s\S]*?}\n?/g, '');
  
  // Remove `{errors.fieldName && <p ...</p>}`
  content = content.replace(/\{errors\.[a-zA-Z]+ && <p className="text-red-500[^>]+>\{errors\.[a-zA-Z]+\}<\/p>\}\n?/g, '');
  
  // Replace className interpolations `className={... ${errors.xxx ? ... : ''}}` with normal strings
  content = content.replace(/className=\{`([^`]*) \$\{errors\.[a-zA-Z]+ \? 'border-red-500' : ''\}`\}/g, 'className="$1"');

  // Fix handleSubmit logic
  content = content.replace(/const validationErrors = validateForm\(\);\s*if \(Object\.keys\(validationErrors\)\.length > 0\) \{[\s\S]*?\}\n/g, '');
  
  content = content.replace(/const validationErrors = validateForm\(\);\s*if \(Object\.keys\(validationErrors\)\.length === 0\) \{/g, 'if (validateForm()) {');

  // Remove setErrors usages
  content = content.replace(/setErrors\([^)]*\);\n?/g, '');
  
  // Remove `return newErrors;` and the newErrors declaration if they exist in validateForm
  content = content.replace(/const newErrors: FormErrors = \{\};\n?/g, '');
  content = content.replace(/let newErrors: FormErrors = \{\};\n?/g, '');
  content = content.replace(/return newErrors;\n?/g, 'return true;');

  fs.writeFileSync(filePath, content);
  console.log(`Cleaned ${filePath}`);
}

cleanFile('src/components/BookingModal.tsx');
cleanFile('src/pages/Contact.tsx');
cleanFile('src/pages/Services.tsx');
